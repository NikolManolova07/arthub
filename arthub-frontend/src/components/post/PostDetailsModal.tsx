import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import { Comment, CommentCreateRequest, PostDetails } from "../../types/types";
import { commentModalStyles } from "../../styles/styles";
import { createComment, deleteComment } from "../../api/postApi";
import { DEFAULT_USER_PROFILE_ICON } from '../../api/constants';
import { getImageUrl, formatDate } from "../../helpers/functions";
import { MdDelete } from 'react-icons/md';
import Button from "../ui/Button";

interface PostDetailsModalProps {
    post: PostDetails;
    currentUserId: number;
    onCommentAdded: (postId: number, addedComment: Comment) => void;
    onCommentRemoved: (postId: number, commentId: number) => void;
    onClose: () => void;
}

function PostDetailsModal({ post, currentUserId, onCommentAdded, onCommentRemoved, onClose }: PostDetailsModalProps) {
    const [comments, setComments] = useState(post.comments || []);
    
    const [error, setError] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);

    const initialValues: CommentCreateRequest = {
        comment: ""
    };

    const validationSchema = Yup.object({
        comment: Yup.string()
            .test("no-whitespace", "Коментарът не може да бъде празен!", function (value) {
                if (value && typeof value === "string" && value.trim().length > 0) {
                    return true;
                }
                return this.createError({
                    message: "Коментарът не може да бъде празен!"
                });
            }),
    });

    useEffect(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    const handleSubmit = async (values: CommentCreateRequest, { resetForm }: any) => {
        try {
            const addedComment = await createComment(post.id, values);
            setError(null);
            setComments([...comments, addedComment]);
            post.commentsCount += 1;
            onCommentAdded(post.id, addedComment);
            resetForm();
        } catch (error) {
            setError("Неуспешно добавяне на коментар!");
        }
    };

    const handleDelete = async (commentId: number) => {
        try {
            await deleteComment(post.id, commentId);
            setError(null);
            setComments(comments.filter((comment) => comment.id !== commentId));
            post.commentsCount -= 1;
            onCommentRemoved(post.id, commentId);
        } catch (error) {
            setError("Неуспешно изтриване на коментар!");
        }
    };

    const isPostCreator = post.createdBy.id === currentUserId;

    return (
        <div className={commentModalStyles.background}>
            <div ref={modalRef} className={`${commentModalStyles.container} ${isVisible ? commentModalStyles.transitionVisible : commentModalStyles.transitionHidden}`}>
                <h2 className={commentModalStyles.title}>Коментари ({post.commentsCount})</h2>

                {error && (
                    <div>
                        <p className={commentModalStyles.errorMessage}>{error}</p>
                    </div>
                )}

                <div className={commentModalStyles.commentsSection}>
                    {comments.map((comment) => {
                        const defaultProfileImageUrl = DEFAULT_USER_PROFILE_ICON;
                        const profileImageUrl = getImageUrl(comment.createdBy.imageUrl);
                        const formattedDate = formatDate(comment.createdAt);

                        return (
                            <div key={comment.id} className={commentModalStyles.comment}>
                                <div className={commentModalStyles.commentUser}>
                                    <img
                                        src={profileImageUrl || defaultProfileImageUrl}
                                        alt="Профилна снимка"
                                        className={commentModalStyles.profileImage}
                                        onError={(e) => e.currentTarget.style.display = "none"}
                                    />

                                    <div className={commentModalStyles.group}>
                                        {comment.createdBy.firstName} {comment.createdBy.lastName}
                                        <span className={commentModalStyles.date}>{formattedDate}</span>
                                        <p className={commentModalStyles.body}>{comment.comment}</p>
                                    </div>
                                </div>

                                <div className={commentModalStyles.commentDelete}>
                                    {(isPostCreator || comment.createdBy.id === currentUserId) && (
                                        <Button
                                            onClick={() => handleDelete(comment.id)}
                                            className={commentModalStyles.deleteButton}
                                            icon={<MdDelete />}
                                        >
                                            Изтрий
                                        </Button>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {
                        ({ handleSubmit, isSubmitting }) => {
                            return (
                                <Form onSubmit={handleSubmit} className={commentModalStyles.commentForm}>
                                    <ErrorMessage name="comment" component="div" className={commentModalStyles.errorMessage} />
                                    <Field
                                        as="textarea"
                                        name="comment"
                                        placeholder="Напиши коментар..."
                                        className={commentModalStyles.textArea}
                                    />

                                    <div className={commentModalStyles.items}>
                                        <Button onClick={onClose} className={commentModalStyles.cancelButton}>
                                            Отказ
                                        </Button>
                                        <Button type="submit" disabled={isSubmitting} className={commentModalStyles.createButton}>
                                            Добави коментар
                                        </Button>
                                    </div>
                                </Form>
                            );
                        }
                    }
                </Formik>
            </div>
        </div>
    );
};

export default PostDetailsModal;
