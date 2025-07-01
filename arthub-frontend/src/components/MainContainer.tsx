import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Category, PostDetails } from "../types/types";
import { baseStyles, categoryStyles } from "../styles/styles";
import { getCategories } from "../api/categoryApi";
import { getPosts, getPostsByCategory } from "../api/postApi";
import Button from "./ui/Button";
import PostFeedContainer from "./post/PostFeedContainer";
import Sidebar from "./ui/Sidebar";
import Statistics from "./ui/Statistics";

function MainContainer() {
    const { userId } = useAuth();
    const currentUserId = Number(userId);

    const [posts, setPosts] = useState<PostDetails[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [showAllCategories, setShowAllCategories] = useState(false);
    
    const maxVisibleCategories = 5;
    const visibleCategories = showAllCategories ? categories : categories.slice(0, maxVisibleCategories);
    
    const [error, setError] = useState<string | null>(null);

    // Fetching posts and categories.
    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([fetchPosts(), fetchCategories()]);
            } catch (error) {
                setError("Неуспешно зареждане на данни!");
            }
        };

        // If currentUserId is set, it fetches posts and categories.
        if (currentUserId) {
            fetchData();
        }

        // It triggers whenever currentUserId changes.
    }, [currentUserId]);

    const fetchPosts = async () => {
        try {
            const data = await getPosts();
            setError(null);
            setPosts(data);
        } catch (error) {
            setError("Неуспешно зареждане на постове!");
        }
    };

    const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setError(null);
            setCategories(data);
        } catch (error) {
            setError("Неуспешно зареждане на категории!");
        }
    };

    const fetchPostsByCategory = async (categoryId: number) => {
        try {
            const data = await getPostsByCategory(categoryId);
            setError(null);
            setPosts(data);
        } catch (error) {
            setError("Неуспешно зареждане на постове за категория!");
        }
    };

    const refresh = async () => {
        if (selectedCategory) {
            // If a category is selected, fetch posts by category.
            await fetchPostsByCategory(selectedCategory);
        } else {
            // If no category is selected, fetch all posts.
            await fetchPosts();
        }
    };

    const handleCategorySelect = async (categoryId: number) => {
        setSelectedCategory(categoryId);
        await fetchPostsByCategory(categoryId);
    };

    const handleAllButtonClick = async () => {
        setSelectedCategory(null);
        await fetchPosts();
    };

    return (
        <div className={baseStyles.main}>
            <div className={baseStyles.leftPanel}>
                <Sidebar currentUserId={currentUserId} onPostCreated={refresh} onFollow={refresh} onUnfollow={refresh} />
            </div>

            <div className={baseStyles.middlePanel}>
                <div className={categoryStyles.collection}>
                    <Button
                        onClick={handleAllButtonClick}
                        className={`${categoryStyles.categoryButton} ${selectedCategory === null ? categoryStyles.selectedCategory : ""}`}
                    >
                        Всички
                    </Button>

                    {visibleCategories.map(category => (
                        <Button
                            key={category.id}
                            onClick={() => handleCategorySelect(category.id)}
                            className={`${categoryStyles.categoryButton} ${selectedCategory === category.id ? categoryStyles.selectedCategory : ""}`}
                        >
                            {category.name}
                        </Button>
                    ))}

                    {categories.length > maxVisibleCategories && (
                        <Button
                            onClick={() => setShowAllCategories(prev => !prev)}
                            className={categoryStyles.moreButton}
                        >
                            {showAllCategories ? "По-малко" : "Повече"}
                        </Button>
                    )}
                </div>

                <PostFeedContainer posts={posts} currentUserId={currentUserId} onLike={refresh} onUnlike={refresh} onCommentAdded={refresh} onCommentRemoved={refresh} onPostDeleted={refresh} error={error} />
            </div>

            <div className={baseStyles.rightPanel}>
                <Statistics currentUserId={currentUserId} />
            </div>
        </div>
    );
};

export default MainContainer;
