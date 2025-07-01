import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { QuestionAnswerRequest, QuizDetails } from "../../types/types";
import { quizSolveContainerStyles } from "../../styles/styles";
import { startQuiz, submitQuiz } from "../../api/quizApi";
import { getElapsedTimeFormatted, getImageUrl } from "../../helpers/functions";
import Alert from "../ui/Alert";
import Button from "../ui/Button";

function SolveQuiz() {
    const { quizId } = useParams<{ quizId: string }>();
    const [quiz, setQuiz] = useState<QuizDetails | null>(null);
    const [attemptId, setAttemptId] = useState<number | null>(null);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<QuestionAnswerRequest[]>([]);
    const [timeLeft, setTimeLeft] = useState<number>(0);

    const [error, setError] = useState<string | null>(null);
    const [customAlert, setCustomAlert] = useState<{
        message: string;
        type: "success" | "error";
    } | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const startQuizAttempt = async () => {
            if (!quizId || attemptId) return;
            try {
                const attempt = await startQuiz(Number(quizId));
                setAttemptId(attempt.id);
                setQuiz(attempt.quizDetails);
                // We convert minutes to seconds.
                setTimeLeft(attempt.quizDetails.duration * 60);
            } catch (error) {
                setError("Грешка при стартиране на опит за решаване на куиз!");
                navigate("/main");
            }
        };
        startQuizAttempt();
    }, [quizId]);

    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setCustomAlert({
                        message: "Времето изтече! Опитът беше прекратен.",
                        type: "error",
                    });
                    setTimeout(() => navigate("/main"), 2000);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    useEffect(() => {
        if (customAlert) {
            const timer = setTimeout(() => setCustomAlert(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [customAlert]);

    const handleSelectAnswer = (questionId: number, answerId: number) => {
        setAnswers(prev => {
            const updated = prev.filter(a => a.questionId !== questionId);
            return [...updated, { questionId, answerId }];
        });
    };

    const handleNext = () => {
        setCurrentQuestionIndex(prev => prev + 1);
    };

    const handleSubmit = async () => {
        if (!quiz || !attemptId) return;

        try {
            const result = await submitQuiz(quiz.id, attemptId, answers);
            setCustomAlert({
                message: `Успешно предадохте куиза! Резултат: ${result.score}. Време: ${getElapsedTimeFormatted(result.startTime, result.endTime)}`,
                type: "success",
            });
            setTimeout(() => navigate("/main"), 2000);
        } catch (error) {
            setCustomAlert({
                message: "Грешка при предаването на куиза.",
                type: "error",
            });
            setTimeout(() => navigate("/main"), 2000);
        }
    };

    if (!quiz) return <p className={quizSolveContainerStyles.paragraph}>Зареждане на куиза...</p>;

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const selectedAnswer = answers.find(a => a.questionId === currentQuestion.id)?.answerId;
    const imageUrl = getImageUrl(currentQuestion.imageUrl);

    return (
        <div className={quizSolveContainerStyles.main}>
            <div className={quizSolveContainerStyles.mainPanel}>
                <div className={quizSolveContainerStyles.container}>
                    <h2 className={quizSolveContainerStyles.title}>{quiz.title}</h2>

                    {customAlert && (
                        <Alert
                            message={customAlert.message}
                            type={customAlert.type}
                            onClose={() => setCustomAlert(null)}
                        />
                    )}

                    {error && (
                        <div className={quizSolveContainerStyles.errorMessage}>
                            <p>{error}</p>
                        </div>
                    )}

                    <p className={quizSolveContainerStyles.paragraph}>Оставащо време: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}</p>

                    <div>
                        <div className={quizSolveContainerStyles.questionTitleGroup}>
                            <div className={quizSolveContainerStyles.number}>
                                {currentQuestionIndex + 1}
                            </div>
                            <h3 className={quizSolveContainerStyles.subtitleQuestion}>{currentQuestion.questionContent}</h3>
                        </div>

                        <div className={quizSolveContainerStyles.questionBodyGroup}>
                            {imageUrl && <div className={quizSolveContainerStyles.imageContainer}>
                                <img
                                    src={imageUrl}
                                    alt="Изображение на въпрос"
                                    className={quizSolveContainerStyles.image}
                                    onError={(e) => e.currentTarget.style.display = "none"}
                                />
                            </div>}

                            <div className={quizSolveContainerStyles.answersGroup}>
                                {currentQuestion.answers.map((answer) => (
                                    <div key={answer.id} className={quizSolveContainerStyles.answer}>
                                        <input
                                            type="radio"
                                            name={`question-${currentQuestion.id}`}
                                            value={answer.id}
                                            checked={selectedAnswer === answer.id}
                                            onChange={() => handleSelectAnswer(currentQuestion.id, answer.id)}
                                            id={`answer-${answer.id}`}
                                            className="hidden-radio"
                                        />
                                        <label
                                            htmlFor={`answer-${answer.id}`}
                                            className={`custom-radio-button ${selectedAnswer === answer.id ? "checked" : ""}`}
                                        >
                                            <span className="inner-circle"></span>
                                        </label>
                                        <span>{answer.answerContent}</span>
                                    </div>
                                ))}

                                {currentQuestionIndex < quiz.questions.length - 1 ? (
                                    <Button
                                        className={quizSolveContainerStyles.nextButton}
                                        onClick={handleNext}
                                        disabled={!selectedAnswer}
                                    >
                                        Напред
                                    </Button>
                                ) : (
                                    <Button
                                        className={quizSolveContainerStyles.submitButton}
                                        onClick={handleSubmit}
                                        disabled={answers.length !== quiz.questions.length}
                                    >
                                        Предай
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SolveQuiz;
