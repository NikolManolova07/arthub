import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import { Category, CategoryCreateRequest } from "../../types/types";
import { createCategory } from "../../api/categoryApi";
import { categoryModalStyles } from "../../styles/styles";
import Button from "../ui/Button";

interface CategoryCreateModalProps {
    onCategoryCreated: (newCategory: Category) => void;
    onClose: () => void;
}

function CategoryCreateModal({ onCategoryCreated, onClose }: CategoryCreateModalProps) {
    const [error, setError] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);

    const initialValues: CategoryCreateRequest = {
        name: "",
        description: undefined,
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Името е задължително!")
            .test("no-whitespace", "Името не може да съдържа само празни символи!", function (value) {
                if (value && typeof value === "string" && value.trim().length > 0) {
                    return true;
                }
                return this.createError({
                    message: "Името не може да съдържа само празни символи!"
                });
            }),
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

    const handleSubmit = async (values: CategoryCreateRequest) => {
        try {
            const newCategory = await createCategory(values);
            setError(null);
            onCategoryCreated(newCategory);
            setIsVisible(false);
            onClose();
        } catch (error) {
            setError("Неуспешно създаване на категория!");
        }
    };

    return (
        <div className={categoryModalStyles.background}>
            <div ref={modalRef} className={`${categoryModalStyles.container} ${isVisible ? categoryModalStyles.transitionVisible : categoryModalStyles.transitionHidden}`}>
                <h2 className={categoryModalStyles.title}>Създаване на категория</h2>

                {error && (
                    <div className={categoryModalStyles.errorMessage}>
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
                            const firstError = Object.keys(errors).find((field) => touched[field as keyof CategoryCreateRequest]);

                            return (
                                <Form onSubmit={handleSubmit}>
                                    {firstError && (
                                        <div className={categoryModalStyles.errorMessage}>
                                            <p>{errors[firstError as keyof typeof errors]}</p>
                                        </div>
                                    )}

                                    <div>
                                        <label className={categoryModalStyles.label}>Име</label>
                                        <Field
                                            type="text"
                                            name="name"
                                            placeholder="Име"
                                            className={categoryModalStyles.categoryTitle}
                                        />
                                    </div>

                                    <div>
                                        <label className={categoryModalStyles.label}>Описание</label>
                                        <Field
                                            as="textarea"
                                            name="description"
                                            placeholder="Описание на категорията..."
                                            className={categoryModalStyles.textArea}
                                        />
                                    </div>

                                    <div className={categoryModalStyles.items}>
                                        <Button onClick={onClose} className={categoryModalStyles.cancelButton}>
                                            Отказ
                                        </Button>

                                        <Button type="submit" disabled={isSubmitting} className={categoryModalStyles.createButton}>
                                            Създай категория
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

export default CategoryCreateModal;
