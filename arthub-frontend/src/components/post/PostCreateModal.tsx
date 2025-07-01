import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import { Category, PostCreateRequest, PostDetails } from "../../types/types";
import { postModalStyles } from "../../styles/styles";
import { createPost } from "../../api/postApi";
import { getCategories } from "../../api/categoryApi";
import Button from "../ui/Button";

interface PostCreateModalProps {
    onPostCreated: (newPost: PostDetails) => void;
    onClose: () => void;
}

function PostCreateModal({ onPostCreated, onClose }: PostCreateModalProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [image, setImage] = useState<File | undefined>(undefined);
    
    const [error, setError] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);

    const initialValues: PostCreateRequest = {
        categoryId: 0,
        postContent: "",
        image: undefined,
    };

    const validationSchema = Yup.object({
        categoryId: Yup.number()
            .required("Моля, изберете категория!")
            .positive("Изберете валидна категория!"),
        postContent: Yup.string()
            .required("Съдържанието на поста е задължително!")
            .test("no-whitespace", "Съдържанието не може да съдържа само празни символи!", function (value) {
                if (value && typeof value === "string" && value.trim().length > 0) {
                    return true;
                }
                return this.createError({
                    message: "Съдържанието не може да съдържа само празни символи!"
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

    useEffect(() => {
        if (isVisible) {
            const fetchCategories = async () => {
                try {
                    const data = await getCategories();
                    setError(null);
                    setCategories(data);
                } catch (error) {
                    setError("Неуспешно зареждане на категории!");
                }
            };
            fetchCategories();
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

    const handleSubmit = async (values: PostCreateRequest) => {
        try {
            const newPost = await createPost(values);
            setError(null);
            onPostCreated(newPost);
            setIsVisible(false);
            onClose();
        } catch (error) {
            setError("Неуспешно създаване на пост!");
        }
    };

    return (
        <div className={postModalStyles.background}>
            <div ref={modalRef} className={`${postModalStyles.container} ${isVisible ? postModalStyles.transitionVisible : postModalStyles.transitionHidden}`}>
                <div className={postModalStyles.columns}>
                    <div className="flex-1">
                        <h2 className={postModalStyles.title}>Създаване на пост</h2>

                        {error && (
                            <div className={postModalStyles.errorMessage}>
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
                                    const firstError = Object.keys(errors).find((field) => touched[field as keyof PostCreateRequest]);

                                    return (
                                        <Form onSubmit={handleSubmit}>
                                            {firstError && (
                                                <div className={postModalStyles.errorMessage}>
                                                    <p>{errors[firstError as keyof typeof errors]}</p>
                                                </div>
                                            )}

                                            <div>
                                                <label className={postModalStyles.label}>Категория</label>
                                                <Field
                                                    as="select"
                                                    name="categoryId"
                                                    className={postModalStyles.selection}
                                                >
                                                    <option value={0}>Изберете категория</option>
                                                    {categories.map((c) => (
                                                        <option key={c.id} value={c.id}>
                                                            {c.name}
                                                        </option>
                                                    ))}
                                                </Field>
                                            </div>

                                            <div>
                                                <label className={postModalStyles.label}>Съдържание</label>
                                                <Field
                                                    as="textarea"
                                                    name="postContent"
                                                    placeholder="Описание на поста..."
                                                    className={postModalStyles.textArea}
                                                />
                                            </div>

                                            <div>
                                                <label className={postModalStyles.label}>Изображение</label>
                                                <div className={postModalStyles.items}>
                                                    <label htmlFor="file-upload" className={postModalStyles.uploadLabel}>
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
                                                        <Button onClick={() => handleClear(setFieldValue)} className={postModalStyles.clearButton}>
                                                            Изчисти
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>

                                            <div className={postModalStyles.items}>
                                                <Button onClick={onClose} className={postModalStyles.cancelButton}>
                                                    Отказ
                                                </Button>
                                                <Button type="submit" disabled={isSubmitting} className={postModalStyles.createButton}>
                                                    Създай пост
                                                </Button>
                                            </div>
                                        </Form>
                                    );
                                }
                            }
                        </Formik>
                    </div>

                    <div className="flex-1">
                        <div className={postModalStyles.imageContainer}>
                            {image ? (
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Преглед"
                                    className={postModalStyles.image}
                                />
                            ) : (
                                <span className="text-gray-500">Няма избрано изображение</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default PostCreateModal;
