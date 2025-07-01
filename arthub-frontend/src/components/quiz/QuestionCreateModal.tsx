import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Question, QuestionCreateRequest, QuizCreated } from "../../types/types";
import { questionModalStyles } from "../../styles/styles";
import { getUserById } from "../../api/userApi";
import { createQuestion } from "../../api/quizApi";
import AnswerCreateModal from "./AnswerCreateModal";
import Button from "../ui/Button";

interface QuestionCreateModalProps {
    onQuestionCreated: (newQuestion: Question) => void;
    onClose: () => void;
}

function QuestionCreateModal({ onQuestionCreated, onClose }: QuestionCreateModalProps) {
    const { userId } = useAuth();
    const currentUserId = Number(userId);

    const [isAnswerCreateModalOpen, setAnswerCreateModalOpen] = useState(false);
    const [questionId, setQuestionId] = useState<number | null>(null);
    const [createdQuizzes, setCreatedQuizzes] = useState<QuizCreated[]>([]);
    const [image, setImage] = useState<File | undefined>(undefined);
    
    const [error, setError] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    const initialValues: QuestionCreateRequest = {
        quizId: 0,
        questionContent: "",
        image: undefined,
    };

    const validationSchema = Yup.object({
        quizId: Yup.number()
            .required("Моля, изберете куиз!")
            .positive("Изберете валиден куиз!"),
        questionContent: Yup.string()
            .required("Въпросът е задължителен!")
            .test("no-whitespace", "Въпросът не може да съдържа само празни символи!", function (value) {
                if (value && typeof value === "string" && value.trim().length > 0) {
                    return true;
                }
                return this.createError({
                    message: "Въпросът не може да съдържа само празни символи!"
                });
            }),
    });

    useEffect(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        if (isVisible) {
            const fetchCreatedQuizzes = async () => {
                try {
                    const user = await getUserById(currentUserId);
                    setError(null);
                    setCreatedQuizzes(user.createdQuizzes);
                } catch (error) {
                    setError("Неуспешно зареждане на куизове!");
                }
            };
            fetchCreatedQuizzes();
        }
    }, [isVisible]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setFieldValue("image", file);
        }
    };

    const handleClear = (setFieldValue: any) => {
        setImage(undefined);
        setFieldValue("image", undefined);
    };

    const handleSubmit = async (values: QuestionCreateRequest) => {
        try {
            const newQuestion = await createQuestion(values);
            setError(null);
            setQuestionId(newQuestion.id);
            onQuestionCreated(newQuestion);
            setIsVisible(false);
            setAnswerCreateModalOpen(true);
        } catch (error) {
            setError("Неуспешно създаване на въпрос!");
        }
    };

    return (
        <div className={questionModalStyles.background}>
            <div className={`${questionModalStyles.container} ${isVisible ? questionModalStyles.transitionVisible : questionModalStyles.transitionHidden}`}>
                <div className={questionModalStyles.columns}>
                    <div className="flex-1">
                        <h2 className={questionModalStyles.title}>Създаване на въпрос</h2>

                        {error && (
                            <div className={questionModalStyles.errorMessage}>
                                <p>{error}</p>
                            </div>
                        )}

                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                            validateOnChange={false}
                            validateOnBlur={false}
                        >
                            {
                                ({ handleSubmit, errors, touched, isSubmitting, setFieldValue }) => {
                                    const firstError = Object.keys(errors).find((field) => touched[field as keyof QuestionCreateRequest]);

                                    return (
                                        <Form onSubmit={handleSubmit}>
                                            {firstError && (
                                                <div className={questionModalStyles.errorMessage}>
                                                    <p>{errors[firstError as keyof typeof errors]}</p>
                                                </div>
                                            )}

                                            <div>
                                                <label className={questionModalStyles.label}>Куиз</label>
                                                <Field
                                                    as="select"
                                                    name="quizId"
                                                    className={questionModalStyles.selection}
                                                >
                                                    <option value={0}>Изберете куиз</option>
                                                    {createdQuizzes.map((c) => (
                                                        <option key={c.id} value={c.id}>
                                                            {c.title}
                                                        </option>
                                                    ))}
                                                </Field>
                                            </div>

                                            <div>
                                                <label className={questionModalStyles.label}>Въпрос</label>
                                                <Field
                                                    as="textarea"
                                                    name="questionContent"
                                                    placeholder="Описание на въпроса..."
                                                    className={questionModalStyles.textArea}
                                                />
                                            </div>

                                            <div>
                                                <label className={questionModalStyles.label}>Изображение</label>
                                                <div className={questionModalStyles.items}>
                                                    <label htmlFor="file-upload" className={questionModalStyles.uploadLabel}>
                                                        Прикачи
                                                    </label>
                                                    <input
                                                        id="file-upload"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => handleFileChange(e, setFieldValue)}
                                                        className="hidden"
                                                    />
                                                    {image && (
                                                        <Button onClick={() => handleClear(setFieldValue)} className={questionModalStyles.clearButton}>
                                                            Изчисти
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>

                                            <div className={questionModalStyles.items}>
                                                <Button onClick={onClose} className={questionModalStyles.cancelButton}>
                                                    Отказ
                                                </Button>
                                                
                                                <Button type="submit" disabled={isSubmitting} className={questionModalStyles.createButton}>
                                                    Продължи
                                                </Button>
                                            </div>
                                        </Form>
                                    );
                                }
                            }
                        </Formik>
                    </div>

                    <div className="flex-1">
                        <div className={questionModalStyles.imageContainer}>
                            {image ? (
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Преглед"
                                    className={questionModalStyles.image}
                                />
                            ) : (
                                <span className="text-gray-500">Няма избрано изображение</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {isAnswerCreateModalOpen && questionId && (
                <AnswerCreateModal questionId={questionId} onClose={() => { setAnswerCreateModalOpen(false); onClose() }} />
            )}
        </div>
    );
};

export default QuestionCreateModal;
