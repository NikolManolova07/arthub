import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import { Quiz, QuizCreateRequest } from "../../types/types";
import { quizModalStyles } from "../../styles/styles";
import { createQuiz } from "../../api/quizApi";
import Button from "../ui/Button";

interface QuizCreateModalProps {
    onQuizCreated: (newQuiz: Quiz) => void;
    onClose: () => void;
}

function QuizCreateModal({ onQuizCreated, onClose }: QuizCreateModalProps) {
    const [error, setError] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);

    const initialValues: QuizCreateRequest = {
        title: "",
        duration: 1,
        level: "DEFAULT",
        description: undefined,
    };

    const validationSchema = Yup.object({
        title: Yup.string()
            .required("Заглавието е задължително!")
            .test("no-whitespace", "Заглавието не може да съдържа само празни символи!", function (value) {
                if (value && typeof value === "string" && value.trim().length > 0) {
                    return true;
                }
                return this.createError({
                    message: "Заглавието не може да съдържа само празни символи!"
                });
            }),
        duration: Yup.number()
            .required("Продължителността е задължителна!")
            .positive("Продължителността трябва да бъде положително число!")
            .integer("Продължителността трябва да бъде цяло число!")
            .min(1, "Продължителността трябва да бъде поне 1 минута!"),
        level: Yup.string()
            .oneOf(["EASY", "MEDIUM", "HARD"], "Изберете валидно ниво на трудност!")
            .required("Моля, изберете ниво на трудност!"),
        description: Yup.string()
            .optional()
            .nullable()
            .test("no-whitespace", "Описанието не може да съдържа само празни символи!", function (value) {
                if (value && value.trim().length === 0) {
                    return this.createError({ message: "Описанието не може да съдържа само празни символи!" });
                }
                return true;
            })
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

    const handleSubmit = async (values: QuizCreateRequest) => {
        try {
            const newQuiz = await createQuiz(values);
            setError(null);
            onQuizCreated(newQuiz);
            setIsVisible(false);
            onClose();
        } catch (error) {
            setError("Неуспешно създаване на куиз!");
        }
    };

    return (
        <div className={quizModalStyles.background}>
            <div ref={modalRef} className={`${quizModalStyles.container} ${isVisible ? quizModalStyles.transitionVisible : quizModalStyles.transitionHidden}`}>
                <h2 className={quizModalStyles.title}>Създаване на куиз</h2>

                {error && (
                    <div className={quizModalStyles.errorMessage}>
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
                        ({ handleSubmit, errors, touched, isSubmitting }) => {
                            const firstError = Object.keys(errors).find((field) => touched[field as keyof QuizCreateRequest]);

                            return (
                                <Form onSubmit={handleSubmit}>
                                    {firstError && (
                                        <div className={quizModalStyles.errorMessage}>
                                            <p>{errors[firstError as keyof typeof errors]}</p>
                                        </div>
                                    )}

                                    <div>
                                        <label className={quizModalStyles.label}>Заглавие</label>
                                        <Field
                                            type="text"
                                            name="title"
                                            placeholder="Заглавие"
                                            className={quizModalStyles.quizTitle}
                                        />
                                    </div>

                                    <div className={quizModalStyles.collection}>
                                        <div className={quizModalStyles.group}>
                                            <label className={quizModalStyles.label}>Продължителност (минути)</label>
                                            <Field
                                                name="duration"
                                                type="number"
                                                className={quizModalStyles.duration}
                                            />
                                        </div>

                                        <div className={quizModalStyles.group}>
                                            <label className={quizModalStyles.label}>Ниво</label>
                                            <Field
                                                as="select"
                                                name="level"
                                                className={quizModalStyles.selection}
                                            >
                                                <option value="DEFAULT">Изберете ниво</option>
                                                <option value="EASY">Лесно</option>
                                                <option value="MEDIUM">Средно</option>
                                                <option value="HARD">Трудно</option>
                                            </Field>
                                        </div>
                                    </div>

                                    <div>
                                        <label className={quizModalStyles.label}>Описание</label>
                                        <Field
                                            as="textarea"
                                            name="description"
                                            placeholder="Описание на куиза..."
                                            className={quizModalStyles.textArea}
                                        />
                                    </div>

                                    <div className={quizModalStyles.items}>
                                        <Button onClick={onClose} className={quizModalStyles.cancelButton}>
                                            Отказ
                                        </Button>
                                        
                                        <Button type="submit" disabled={isSubmitting} className={quizModalStyles.createButton}>
                                            Създай куиз
                                        </Button>
                                    </div>
                                </Form>
                            );
                        }
                    }
                </Formik>
            </div >
        </div >
    );
};

export default QuizCreateModal;
