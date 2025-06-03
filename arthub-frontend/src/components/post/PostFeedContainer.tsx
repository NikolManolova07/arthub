import { useState } from "react";
import { Comment, PostDetails } from "../../types/types";
import { postFeedStyles } from "../../styles/styles";
import { deletePost, likePost, unlikePost } from "../../api/postApi";
import { DEFAULT_USER_PROFILE_ICON } from "../../api/constants";
import { getImageUrl, formatDate } from "../../helpers/functions";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import Button from "../ui/Button";
import PostDetailsModal from "../post/PostDetailsModal";

interface PostFeedContainerProps {
    posts: PostDetails[];
    currentUserId: number;
    onLike: (postId: number) => void;
    onUnlike: (postId: number) => void;
    onCommentAdded: (postId: number, addedComment: Comment) => void;
    onCommentRemoved: (postId: number, commentId: number) => void;
    onPostDeleted: (postId: number) => void;
    error: string | null;
}

function PostFeedContainer({ posts, currentUserId, onLike, onUnlike, onCommentAdded, onCommentRemoved, onPostDeleted, error }: PostFeedContainerProps) {
    const [selectedPost, setSelectedPost] = useState<PostDetails | null>(null);
    const [postError, setPostError] = useState<string | null>(null);

    const handleLike = async (postId: number) => {
        try {
            await likePost(postId);
            setPostError(null);
            // Update posts in the parent.
            onLike(postId);
        } catch (error) {
            setPostError("Вече сте харесали този пост!");
        }
    };

    const handleUnlike = async (postId: number) => {
        try {
            await unlikePost(postId);
            setPostError(null);
            // Update posts in the parent.
            onUnlike(postId);
        } catch (error) {
            setPostError("Не може да премахнете харесване на пост, който не сте харесали още!");
        }
    };

    const handlePostDelete = async (postId: number) => {
        try {
            await deletePost(postId);
            setPostError(null);
            // Update posts in the parent.
            onPostDeleted(postId);
        } catch (error) {
            setPostError("Неуспешно изтриване на пост!");
        }
    };

    const renderPostActions = (post: PostDetails) => {
        const isLiked = post.likedByLoggedInUser || false;
        const likesCount = (post.likesCount >= 0 ? post.likesCount : null) || null;
        const commentsCount = post.commentsCount || null;
        const isOwner = post.createdBy.id === currentUserId;

        return (
            <div className={postFeedStyles.buttonGroup}>
                <Button
                    onClick={() => handleLike(post.id)}
                    className={isLiked ? postFeedStyles.likedButton : postFeedStyles.button}
                    icon={<AiOutlineLike />}
                    disabled={isLiked}
                >
                    {likesCount}
                </Button>

                <Button
                    onClick={() => setSelectedPost(post)}
                    className={postFeedStyles.button}
                    icon={<GoComment />}
                >
                    {commentsCount}
                </Button>

                <Button
                    onClick={() => handleUnlike(post.id)}
                    className={postFeedStyles.button}
                    icon={<AiOutlineDislike />}
                    disabled={!isLiked}
                />

                {isOwner && (
                    <Button
                        onClick={() => handlePostDelete(post.id)}
                        className={postFeedStyles.deleteButton}
                        icon={<MdDelete />}
                    >
                        Изтрий
                    </Button>
                )}
            </div>
        );
    };

    if (posts.length == 0) {
        return <p className={postFeedStyles.paragraph}>Няма налични постове.</p>;
    }

    // Show global error first, then post-specific error.
    const globalError = error;
    if (globalError) {
        return (
            <div className={postFeedStyles.errorMessage}>
                <p>{globalError}</p>
            </div>
        );
    }

    return (
        <div className={postFeedStyles.container}>
            <h2 className={postFeedStyles.title}>Постове</h2>

            {postError && (
                <div className={postFeedStyles.errorMessage}>
                    <p>{postError}</p>
                </div>
            )}

            {posts.map((post) => {
                const defaultProfileImageUrl = DEFAULT_USER_PROFILE_ICON;
                const profileImageUrl = getImageUrl(post.createdBy.imageUrl);
                const formattedDate = formatDate(post.createdAt);
                const imageUrl = getImageUrl(post.imageUrl);

                return (
                    <div key={post.id} className={postFeedStyles.postCard}>
                        <div className={postFeedStyles.postUser}>
                            <img
                                src={profileImageUrl || defaultProfileImageUrl}
                                alt="Профилна снимка"
                                className={postFeedStyles.profileImage}
                                onError={(e) => e.currentTarget.style.display = "none"}
                            />

                            <div className={postFeedStyles.postGroup}>
                                {post.createdBy.firstName} {post.createdBy.lastName}
                                <span className={postFeedStyles.postDate}>{formattedDate}</span>
                            </div>
                        </div>

                        <p className={postFeedStyles.postContent}>{post.postContent}</p>

                        {imageUrl && (
                            <img
                                src={imageUrl}
                                alt="Снимка на публикация"
                                className={postFeedStyles.postImage}
                                onError={(e) => e.currentTarget.style.display = "none"}
                            />
                        )}

                        {renderPostActions(post)}
                    </div>
                );
            })}

            {selectedPost && <PostDetailsModal post={selectedPost} currentUserId={currentUserId} onCommentAdded={onCommentAdded} onCommentRemoved={onCommentRemoved} onClose={() => setSelectedPost(null)} />}
        </div>
    );
}

export default PostFeedContainer;
