import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Quiz } from "../../types/types";
import { quizContainerStyles } from "../../styles/styles";
import { getQuizzes } from "../../api/quizApi";
import { DEFAULT_USER_PROFILE_ICON } from "../../api/constants";
import { getImageUrl } from "../../helpers/functions";
import Button from "../ui/Button";

function QuizSolveContainer() {
    const { userId } = useAuth();
    const currentUserId = Number(userId);
    
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const levelMap = {
        EASY: "Лесно",
        MEDIUM: "Средно",
        HARD: "Трудно",
    };

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const data = await getQuizzes();
                setError(null);
                setQuizzes(data);
            } catch (error) {
                setError("Неуспешно зареждане на куизове!");
            }
        };
        if (currentUserId) {
            fetchQuizzes();
        }
    }, [currentUserId]);

    const navigateToQuiz = (quizId: number) => {
        navigate(`/solve-quiz/${quizId}`);
    };

    return (
        <div className={quizContainerStyles.main}>
            <div className={quizContainerStyles.mainPanel}>
                <div className={quizContainerStyles.container}>
                    <h2 className={quizContainerStyles.title}>Куизове</h2>

                    {error && (
                        <div className={quizContainerStyles.errorMessage}>
                            <p>{error}</p>
                        </div>
                    )}

                    {quizzes.length > 0 ? (
                        <div>
                            <div className={quizContainerStyles.quizSolveHeaderRow}>
                                <div>№</div>
                                <div>Заглавие</div>
                                <div>Описание</div>
                                <div>Продължителност</div>
                                <div>Ниво</div>
                                <div>Автор</div>
                                <div>Брой въпроси</div>
                                <div>Действие</div>
                            </div>

                            <div className={quizContainerStyles.quizzesSection}>
                                {quizzes.map((quiz, index) => {
                                    const defaultProfileImageUrl = DEFAULT_USER_PROFILE_ICON;
                                    const profileImageUrl = getImageUrl(quiz.createdBy.imageUrl);
                                    const description = (quiz.description ? quiz.description : "Няма описание.");
                                    const rowClass = index % 2 === 0 ? quizContainerStyles.evenRow : quizContainerStyles.oddRow;

                                    return (
                                        <div key={quiz.id} className={`${quizContainerStyles.quizCard} ${rowClass}`}>
                                            <div className={quizContainerStyles.quizSolveTable}>
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

                                                <div className={quizContainerStyles.createdBy}>
                                                    <div className={quizContainerStyles.user}>
                                                        <img
                                                            src={profileImageUrl || defaultProfileImageUrl}
                                                            alt="Профилна снимка"
                                                            className={quizContainerStyles.profileImage}
                                                            onError={(e) => e.currentTarget.style.display = "none"}
                                                        />

                                                        <div className={quizContainerStyles.group}>
                                                            {quiz.createdBy.firstName} {quiz.createdBy.lastName}
                                                            <span className={quizContainerStyles.username}>@{quiz.createdBy.username}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>{quiz.questionsCount}</div>
                                                
                                                <div>
                                                    <Button onClick={() => navigateToQuiz(quiz.id)} className={quizContainerStyles.solveButton}>
                                                        Реши куиз
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <p className={quizContainerStyles.paragraph}>Нямате куизове за решаване.</p>
                    )}
                </div>
            </div>
        </div >
    );
};

export default QuizSolveContainer;
