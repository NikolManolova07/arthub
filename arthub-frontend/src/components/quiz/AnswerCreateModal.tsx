import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { FormAnswerRequest } from "../../types/types";
import { answerModalStyles } from "../../styles/styles";
import { createAnswer } from "../../api/quizApi";
import Button from "../ui/Button";

interface AnswerCreateModalProps {
    questionId: number;
    onClose: () => void;
}

const AnswerCreateModal = ({ questionId, onClose }: AnswerCreateModalProps) => {
    const [error, setError] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    const initialValues: FormAnswerRequest = {
        answers: [
            { answerContent: "" },
            { answerContent: "" },
            { answerContent: "" },
            { answerContent: "" },
        ],
        correctAnswerIndex: -1,
    };

    const validationSchema = Yup.object().shape({
        answers: Yup.array()
            .of(
                Yup.object().shape({
                    answerContent: Yup.string()
                        .required("Отговорът е задължителен.")
                        .test("no-whitespace", "Отговорът не може да съдържа само празни символи!", function (value) {
                            if (value && typeof value === "string" && value.trim().length > 0) {
                                return true;
                            }
                            return this.createError({
                                message: "Отговорът не може да съдържа само празни символи!"
                            });
                        }),
                })
            )
            .length(4, "Трябва да има точно 4 отговора."),
        correctAnswerIndex: Yup.number()
            .min(0, "Изберете верен отговор.")
            .max(3, "Невалиден индекс на верен отговор.")
            .required("Изберете верен отговор."),
    });

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleSubmit = async (values: FormAnswerRequest) => {
        try {
            for (let i = 0; i < values.answers.length; i++) {
                const answer = values.answers[i];
                await createAnswer({
                    questionId,
                    answerContent: answer.answerContent,
                    isCorrect: i === values.correctAnswerIndex,
                });
                setError(null);
            }
            onClose();
        } catch (error) {
            setError("Неуспешно създаване на отговори към въпрос!");
        }
    };

    return (
        <div className={answerModalStyles.background}>
            <div className={`${answerModalStyles.container} ${isVisible ? answerModalStyles.transitionVisible : answerModalStyles.transitionHidden}`}>
                <h2 className={answerModalStyles.title}>Създаване на отговори</h2>

                {error && (
                    <div className={answerModalStyles.errorMessage}>
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
                        ({ handleSubmit, values, errors, touched, isSubmitting, setFieldValue }) => {
                            return (
                                <Form onSubmit={handleSubmit}>
                                    {values.answers.map((_, index) => (
                                        <div key={index} className={answerModalStyles.collection}>
                                            <div>
                                                <Field
                                                    type="text"
                                                    name={`answers[${index}].answerContent`}
                                                    placeholder={`Отговор ${index + 1}`}
                                                    className={answerModalStyles.answerContent}
                                                />
                                            </div>

                                            <div className={answerModalStyles.group}>
                                                <Field
                                                    type="radio"
                                                    name="correctAnswerIndex"
                                                    value={index}
                                                    checked={values.correctAnswerIndex === index}
                                                    onChange={() => setFieldValue("correctAnswerIndex", index)}
                                                    id={`correctAnswerIndex-${index}`}
                                                    className="hidden-radio"
                                                />
                                                <label
                                                    htmlFor={`correctAnswerIndex-${index}`}
                                                    className={`custom-radio-button ${values.correctAnswerIndex === index ? "checked" : ""}`}
                                                >
                                                    <span className="inner-circle"></span>
                                                </label>
                                                <span className={answerModalStyles.correctAnswer}>Верен</span>
                                            </div>

                                            {touched.answers?.[index]?.answerContent && errors.answers?.[index] &&
                                                typeof errors.answers[index] !== "string" && errors.answers[index]?.answerContent && (
                                                    <div className={answerModalStyles.answerErrorMessage}>
                                                        <p>{errors.answers[index]?.answerContent}</p>
                                                    </div>
                                                )}
                                        </div>
                                    ))}

                                    {touched.correctAnswerIndex && errors.correctAnswerIndex && (
                                        <div className={answerModalStyles.errorMessage}>
                                            <p>{errors.correctAnswerIndex}</p>
                                        </div>
                                    )}

                                    <div className={answerModalStyles.items}>
                                        <Button type="submit" disabled={isSubmitting} className={answerModalStyles.createButton}>
                                            Запази
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

export default AnswerCreateModal;
