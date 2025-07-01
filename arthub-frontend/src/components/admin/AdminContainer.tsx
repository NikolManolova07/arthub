import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Category, Post, Quiz, User } from "../../types/types";
import { adminContainerStyles } from "../../styles/styles";
import { deleteUserByAdmin, getUsersByAdmin, promoteUser } from "../../api/userApi";
import { deletePost, getPostsByAdmin } from "../../api/postApi";
import { deleteQuiz, getQuizzesByAdmin } from "../../api/quizApi";
import { deleteCategoryByAdmin, getCategories } from "../../api/categoryApi";
import { DEFAULT_USER_PROFILE_ICON } from "../../api/constants";
import { formatDate, getImageUrl } from "../../helpers/functions";
import { MdDelete } from "react-icons/md";
import AdminSidebar from "../ui/AdminSidebar";
import Button from "../ui/Button";
import CategoryCreateModal from "./CategoryCreateModal";

function AdminContainer() {
    const { userId } = useAuth();
    const currentUserId = Number(userId);

    const [isCategoryCreateModalOpen, setCategoryCreateModalOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    
    const [error, setError] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState<"users" | "posts" | "quizzes" | "categories">("users");

    const levelMap = {
        EASY: "Лесно",
        MEDIUM: "Средно",
        HARD: "Трудно",
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    fetchUsers(),
                    fetchPosts(),
                    fetchQuizzes(),
                    fetchCategories()
                ]);
            } catch (error) {
                setError("Неуспешно зареждане на данни!");
            }
        };
        if (currentUserId) {
            fetchData();
        }
    }, [currentUserId]);

    const fetchUsers = async () => {
        try {
            const data = await getUsersByAdmin();
            setError(null);
            setUsers(data);
        } catch (error) {
            setError("Неуспешно зареждане на потребители!");
        }
    };

    const fetchPosts = async () => {
        try {
            const data = await getPostsByAdmin();
            setError(null);
            setPosts(data);
        } catch (error) {
            setError("Неуспешно зареждане на постове!");
        }
    };

    const fetchQuizzes = async () => {
        try {
            const data = await getQuizzesByAdmin();
            setError(null);
            setQuizzes(data);
        } catch (error) {
            setError("Неуспешно зареждане на куизове!");
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

    const refresh = async () => {
        switch (activeSection) {
            case "users":
                await fetchUsers();
                break;
            case "posts":
                await fetchPosts();
                break;
            case "quizzes":
                await fetchQuizzes();
                break;
            case "categories":
                await fetchCategories();
                break;
            default:
                break;
        }
    };

    const handleUserDelete = async (userId: number) => {
        try {
            await deleteUserByAdmin(userId);
            setError(null);
            await refresh();
        } catch (error) {
            setError("Неуспешно изтриване на потребител!");
        }
    };

    const handleUserPromote = async (userId: number) => {
        try {
            await promoteUser(userId);
            setError(null);
            await refresh();
        } catch (error) {
            setError("Неуспешно задаване на админ роля на потребител!");
        }
    };

    const handlePostDelete = async (postId: number) => {
        try {
            await deletePost(postId);
            setError(null);
            await refresh();
        } catch (error) {
            setError("Неуспешно изтриване на пост!");
        }
    };

    const handleCategoryDelete = async (categoryId: number) => {
        try {
            await deleteCategoryByAdmin(categoryId);
            setError(null);
            await refresh();
        } catch (error) {
            setError("Неуспешно изтриване на категория!");
        }
    };

    const handleQuizDelete = async (quizId: number) => {
        try {
            await deleteQuiz(quizId);
            setError(null);
            await refresh();
        } catch (error) {
            setError("Неуспешно изтриване на куиз!");
        }
    };

    const renderTableContent = () => {
        switch (activeSection) {
            case "users":
                return (
                    <>
                        <h2 className={adminContainerStyles.title}>Потребители</h2>
                        {error && (
                            <div className={adminContainerStyles.errorMessage}>
                                <p>{error}</p>
                            </div>
                        )}

                        {users.length > 0 ? (
                            <div>
                                <div className={adminContainerStyles.userHeaderRow}>
                                    <div>№</div>
                                    <div>Потребител</div>
                                    <div>Имейл</div>
                                    <div>Роля</div>
                                    <div>Действие</div>
                                    <div>Действие</div>
                                </div>

                                <div className={adminContainerStyles.section}>
                                    {users.map((user, index) => {
                                        const defaultProfileImageUrl = DEFAULT_USER_PROFILE_ICON;
                                        const profileImageUrl = getImageUrl(user.imageUrl);
                                        const rowClass = index % 2 === 0 ? adminContainerStyles.evenRow : adminContainerStyles.oddRow;

                                        return (
                                            <div key={user.id} className={`${adminContainerStyles.card} ${rowClass}`}>
                                                <div className={adminContainerStyles.userTable}>
                                                    <div className={adminContainerStyles.number}>
                                                        {index + 1}
                                                    </div>

                                                    <div className={adminContainerStyles.createdBy}>
                                                        <div className={adminContainerStyles.user}>
                                                            <img
                                                                src={profileImageUrl || defaultProfileImageUrl}
                                                                alt="Профилна снимка"
                                                                className={adminContainerStyles.profileImage}
                                                                onError={(e) => e.currentTarget.style.display = "none"}
                                                            />

                                                            <div className={adminContainerStyles.group}>
                                                                {user.firstName} {user.lastName}
                                                                <span className={adminContainerStyles.username}>@{user.username}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div>{user.email}</div>

                                                    <div>{user.role}</div>

                                                    <div>
                                                        {user.role == "USER" &&
                                                            <Button
                                                                onClick={() => handleUserPromote(user.id)}
                                                                className={adminContainerStyles.promoteButton}
                                                            >
                                                                Админ
                                                            </Button>
                                                        }
                                                    </div>

                                                    <div>
                                                        <Button
                                                            onClick={() => handleUserDelete(user.id)}
                                                            className={adminContainerStyles.deleteButton}
                                                            icon={<MdDelete />}
                                                        >
                                                            Изтрий
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <p className={adminContainerStyles.paragraph}>Зареждане на потребители.</p>
                        )}
                    </>
                );
            case "posts":
                return (
                    <>
                        <h2 className={adminContainerStyles.title}>Постове</h2>
                        {error && (
                            <div className={adminContainerStyles.errorMessage}>
                                <p>{error}</p>
                            </div>
                        )}

                        {posts.length > 0 ? (
                            <div>
                                <div className={adminContainerStyles.postHeaderRow}>
                                    <div>№</div>
                                    <div>Категория</div>
                                    <div>Автор</div>
                                    <div>Брой харесвания</div>
                                    <div>Брой коментари</div>
                                    <div>Дата</div>
                                    <div>Действие</div>
                                </div>

                                <div className={adminContainerStyles.section}>
                                    {posts.map((post, index) => {
                                        const defaultProfileImageUrl = DEFAULT_USER_PROFILE_ICON;
                                        const profileImageUrl = getImageUrl(post.createdBy.imageUrl);
                                        const formattedDate = formatDate(post.createdAt);
                                        const rowClass = index % 2 === 0 ? adminContainerStyles.evenRow : adminContainerStyles.oddRow;

                                        return (
                                            <div key={post.id} className={`${adminContainerStyles.card} ${rowClass}`}>
                                                <div className={adminContainerStyles.postTable}>
                                                    <div className={adminContainerStyles.number}>
                                                        {index + 1}
                                                    </div>

                                                    <div className={adminContainerStyles.categoryTitle}>
                                                        {post.category.name}
                                                    </div>

                                                    <div className={adminContainerStyles.createdBy}>
                                                        <div className={adminContainerStyles.user}>
                                                            <img
                                                                src={profileImageUrl || defaultProfileImageUrl}
                                                                alt="Профилна снимка"
                                                                className={adminContainerStyles.profileImage}
                                                                onError={(e) => e.currentTarget.style.display = "none"}
                                                            />

                                                            <div className={adminContainerStyles.group}>
                                                                {post.createdBy.firstName} {post.createdBy.lastName}
                                                                <span className={adminContainerStyles.username}>@{post.createdBy.username}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div>{post.likesCount}</div>

                                                    <div>{post.commentsCount}</div>

                                                    <div>{formattedDate}</div>

                                                    <div>
                                                        <Button
                                                            onClick={() => handlePostDelete(post.id)}
                                                            className={adminContainerStyles.deleteButton}
                                                            icon={<MdDelete />}
                                                        >
                                                            Изтрий
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <p className={adminContainerStyles.paragraph}>Зареждане на постове.</p>
                        )}
                    </>
                );
            case "quizzes":
                return (
                    <>
                        <h2 className={adminContainerStyles.title}>Куизове</h2>
                        {error && (
                            <div className={adminContainerStyles.errorMessage}>
                                <p>{error}</p>
                            </div>
                        )}

                        {quizzes.length > 0 ? (
                            <div>
                                <div className={adminContainerStyles.quizHeaderRow}>
                                    <div>№</div>
                                    <div>Заглавие</div>
                                    <div>Описание</div>
                                    <div>Продължителност</div>
                                    <div>Ниво</div>
                                    <div>Автор</div>
                                    <div>Брой въпроси</div>
                                    <div>Действие</div>
                                </div>

                                <div className={adminContainerStyles.section}>
                                    {quizzes.map((quiz, index) => {
                                        const defaultProfileImageUrl = DEFAULT_USER_PROFILE_ICON;
                                        const profileImageUrl = getImageUrl(quiz.createdBy.imageUrl);
                                        const description = (quiz.description ? quiz.description : "Няма описание.");
                                        const rowClass = index % 2 === 0 ? adminContainerStyles.evenRow : adminContainerStyles.oddRow;

                                        return (
                                            <div key={quiz.id} className={`${adminContainerStyles.card} ${rowClass}`}>
                                                <div className={adminContainerStyles.quizTable}>
                                                    <div className={adminContainerStyles.number}>
                                                        {index + 1}
                                                    </div>

                                                    <div className={adminContainerStyles.quizTitle}>
                                                        {quiz.title}
                                                    </div>

                                                    <div className={adminContainerStyles.description}>
                                                        {description}
                                                    </div>

                                                    <div>{quiz.duration} мин.</div>

                                                    <div className={adminContainerStyles.level}>
                                                        {levelMap[quiz.level] || quiz.level}
                                                    </div>

                                                    <div className={adminContainerStyles.createdBy}>
                                                        <div className={adminContainerStyles.user}>
                                                            <img
                                                                src={profileImageUrl || defaultProfileImageUrl}
                                                                alt="Профилна снимка"
                                                                className={adminContainerStyles.profileImage}
                                                                onError={(e) => e.currentTarget.style.display = "none"}
                                                            />

                                                            <div className={adminContainerStyles.group}>
                                                                {quiz.createdBy.firstName} {quiz.createdBy.lastName}
                                                                <span className={adminContainerStyles.username}>@{quiz.createdBy.username}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div>{quiz.questionsCount}</div>

                                                    <div>
                                                        <Button
                                                            onClick={() => handleQuizDelete(quiz.id)}
                                                            className={adminContainerStyles.deleteButton}
                                                            icon={<MdDelete />}
                                                        >
                                                            Изтрий
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <p className={adminContainerStyles.paragraph}>Зареждане на куизове.</p>
                        )}
                    </>
                );
            case "categories":
                return (
                    <>
                        <h2 className={adminContainerStyles.title}>Категории</h2>
                        {error && (
                            <div className={adminContainerStyles.errorMessage}>
                                <p>{error}</p>
                            </div>
                        )}

                        <div>
                            <Button onClick={() => setCategoryCreateModalOpen(true)} className={adminContainerStyles.createButton}>
                                Създай категория
                            </Button>
                        </div>

                        {categories.length > 0 ? (
                            <div>
                                <div className={adminContainerStyles.categoryHeaderRow}>
                                    <div>№</div>
                                    <div>Име</div>
                                    <div>Описание</div>
                                    <div>Действие</div>
                                </div>

                                <div className={adminContainerStyles.section}>
                                    {categories.map((category, index) => {
                                        const description = (category.description ? category.description : "Няма описание.");
                                        const rowClass = index % 2 === 0 ? adminContainerStyles.evenRow : adminContainerStyles.oddRow;

                                        return (
                                            <div key={category.id} className={`${adminContainerStyles.card} ${rowClass}`}>
                                                <div className={adminContainerStyles.categoryTable}>
                                                    <div className={adminContainerStyles.number}>
                                                        {index + 1}
                                                    </div>

                                                    <div className={adminContainerStyles.categoryTitle}>
                                                        {category.name}
                                                    </div>

                                                    <div className={adminContainerStyles.description}>
                                                        {description}
                                                    </div>

                                                    <div>
                                                        <Button
                                                            onClick={() => handleCategoryDelete(category.id)}
                                                            className={adminContainerStyles.deleteButton}
                                                            icon={<MdDelete />}
                                                        >
                                                            Изтрий
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <p className={adminContainerStyles.paragraph}>Зареждане на категории.</p>
                        )}
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className={adminContainerStyles.main}>
            <div className={adminContainerStyles.leftPanel}>
                <AdminSidebar onSelectSection={setActiveSection} />
            </div>

            <div className={adminContainerStyles.rightPanel}>
                <div className={adminContainerStyles.container}>
                    {renderTableContent()}
                </div>
            </div>

            {isCategoryCreateModalOpen && <CategoryCreateModal onCategoryCreated={refresh} onClose={() => setCategoryCreateModalOpen(false)} />}
        </div>
    );
};

export default AdminContainer;
