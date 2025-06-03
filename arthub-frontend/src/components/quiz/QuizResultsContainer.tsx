import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { QuizResults } from "../../types/types";
import { quizResultsContainerStyles } from "../../styles/styles";
import { getTopQuizResults } from "../../api/quizApi";
import { DEFAULT_USER_PROFILE_ICON } from "../../api/constants";
import { getElapsedTimeFormatted, getImageUrl } from "../../helpers/functions";

function QuizResultsContainer() {
    const { userId } = useAuth();
    const currentUserId = Number(userId);

    const [quizResults, setQuizResults] = useState<QuizResults[]>([]);
    
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data = await getTopQuizResults();
                setError(null);
                setQuizResults(data);
            } catch (error) {
                setError("Неуспешно зареждане на резултати!");
            }
        };
        if (currentUserId) {
            fetchResults();
        }
    }, [currentUserId]);

    return (
        <div className={quizResultsContainerStyles.main}>
            <div className={quizResultsContainerStyles.mainPanel}>
                <div className={quizResultsContainerStyles.container}>
                    <h2 className={quizResultsContainerStyles.title}>Резултати от куизове</h2>

                    {error && (
                        <div className={quizResultsContainerStyles.errorMessage}>
                            <p>{error}</p>
                        </div>
                    )}

                    {quizResults.length > 0 ? (
                        <div className={quizResultsContainerStyles.quizzesSection}>
                            {quizResults.map((result, index) => {
                                const rowClass = index % 2 === 0 ? quizResultsContainerStyles.evenRow : quizResultsContainerStyles.oddRow;

                                return (
                                    <div key={result.quizId} className={quizResultsContainerStyles.quiz}>
                                        <h3 className={quizResultsContainerStyles.subtitle}>{result.quizName}</h3>

                                        <div className={quizResultsContainerStyles.quizHeaderRow}>
                                            <div>№</div>
                                            <div>Потребител</div>
                                            <div>Имейл</div>
                                            <div>Точки</div>
                                            <div>Време</div>
                                        </div>

                                        <div>
                                            {result.topUsers.map((topUser, index) => (
                                                <div key={topUser.user.id} className={`${quizResultsContainerStyles.quizCard} ${rowClass}`}>
                                                    <div className={quizResultsContainerStyles.quizResultsTable}>
                                                        <div className={quizResultsContainerStyles.rank}>
                                                            {index + 1}
                                                        </div>

                                                        <div className={quizResultsContainerStyles.solvedBy}>
                                                            <div className={quizResultsContainerStyles.user}>
                                                                <img
                                                                    src={getImageUrl(topUser.user.imageUrl) || DEFAULT_USER_PROFILE_ICON}
                                                                    alt="Профилна снимка"
                                                                    className={quizResultsContainerStyles.profileImage}
                                                                    onError={(e) => e.currentTarget.style.display = "none"}
                                                                />

                                                                <div className={quizResultsContainerStyles.group}>
                                                                    {topUser.user.firstName} {topUser.user.lastName}
                                                                    <span className={quizResultsContainerStyles.username}>@{topUser.user.username}</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div>{topUser.user.email}</div>

                                                        <div className={quizResultsContainerStyles.totalScore}>
                                                            {topUser.score}
                                                        </div>

                                                        <div>
                                                            {getElapsedTimeFormatted(topUser.startTime, topUser.endTime)}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className={quizResultsContainerStyles.paragraph}>Няма налични резултати.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizResultsContainer;
