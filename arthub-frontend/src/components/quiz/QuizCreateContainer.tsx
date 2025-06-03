import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { QuizCreated } from "../../types/types";
import { quizContainerStyles } from "../../styles/styles";
import { getUserById } from "../../api/userApi";
import { deleteQuiz } from "../../api/quizApi";
import { MdDelete } from "react-icons/md";
import Button from "../ui/Button";
import QuizSidebar from "../ui/QuizSidebar";

function QuizCreateContainer() {
    const { userId } = useAuth();
    const currentUserId = Number(userId);

    const [createdQuizzes, setCreatedQuizzes] = useState<QuizCreated[]>([]);
    
    const [error, setError] = useState<string | null>(null);

    const levelMap = {
        EASY: "Лесно",
        MEDIUM: "Средно",
        HARD: "Трудно",
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchCreatedQuizzes();
            } catch (error) {
                setError("Неуспешно зареждане на данни!");
            }
        };
        if (currentUserId) {
            fetchData();
        }
    }, [currentUserId]);

    const fetchCreatedQuizzes = async () => {
        try {
            const user = await getUserById(currentUserId);
            setError(null);
            setCreatedQuizzes(user.createdQuizzes);
        } catch (error) {
            setError("Неуспешно зареждане на куизове!");
        }
    };

    const refresh = async () => {
        await fetchCreatedQuizzes();
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

    return (
        <div className={quizContainerStyles.main}>
            <div className={quizContainerStyles.leftPanel}>
                <QuizSidebar onQuizCreated={refresh} onQuestionCreated={refresh} />
            </div>

            <div className={quizContainerStyles.rightPanel}>
                <div className={quizContainerStyles.container}>
                    <h2 className={quizContainerStyles.title}>Куизове</h2>

                    {error && (
                        <div className={quizContainerStyles.errorMessage}>
                            <p>{error}</p>
                        </div>
                    )}

                    {createdQuizzes.length > 0 ? (
                        <div>
                            <div className={quizContainerStyles.quizCreateHeaderRow}>
                                <div>№</div>
                                <div>Заглавие</div>
                                <div>Описание</div>
                                <div>Продължителност</div>
                                <div>Ниво</div>
                                <div>Брой въпроси</div>
                                <div>Действие</div>
                            </div>

                            <div className={quizContainerStyles.quizzesSection}>
                                {createdQuizzes.map((quiz, index) => {
                                    const description = (quiz.description ? quiz.description : "Няма описание.");
                                    const rowClass = index % 2 === 0 ? quizContainerStyles.evenRow : quizContainerStyles.oddRow;

                                    return (
                                        <div key={quiz.id} className={`${quizContainerStyles.quizCard} ${rowClass}`}>
                                            <div className={quizContainerStyles.quizCreateTable}>
                                                <div className={quizContainerStyles.number}>
                                                    {index + 1}
                                                </div>

                                                <div className={quizContainerStyles.quizTitle}>
                                                    {quiz.title}
                                                </div>

                                                <div className={quizContainerStyles.description}>
                                                    {description}
                                                </div>

                                                <div>{quiz.duration} мин.</div>

                                                <div className={quizContainerStyles.level}>
                                                    {levelMap[quiz.level] || quiz.level}
                                                </div>

                                                <div>{quiz.questionsCount}</div>

                                                <div>
                                                    <Button
                                                        onClick={() => handleQuizDelete(quiz.id)}
                                                        className={quizContainerStyles.deleteButton}
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
                        <p className={quizContainerStyles.paragraph}>Нямате създадени куизове.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizCreateContainer;
