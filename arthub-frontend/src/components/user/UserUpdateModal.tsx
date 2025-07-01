import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import { User, UserDetails, UserUpdateRequest } from "../../types/types";
import { userUpdateModalStyles } from "../../styles/styles";
import { getUserById, updateUser } from "../../api/userApi";
import { DEFAULT_USER_PROFILE_ICON } from "../../api/constants";
import { getImageUrl } from "../../helpers/functions";
import Button from "../ui/Button";

interface UserUpdateModalProps {
    currentUserId: number;
    onUserUpdated: (updatedUser: User) => void;
    onClose: () => void;
}

function UserUpdateModal({ currentUserId, onUserUpdated, onClose }: UserUpdateModalProps) {
    const [currentUser, setCurrentUser] = useState<UserDetails>();
    const [image, setImage] = useState<File | undefined>(undefined);
    
    const [error, setError] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Невалиден имейл адрес!")
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
            const fetchUserData = async () => {
                try {
                    const user = await getUserById(currentUserId);
                    setError(null);
                    setCurrentUser(user);
                } catch (error) {
                    setError("Неуспешно зареждане на данни за логнат потребител!");
                }
            };
            fetchUserData();
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

    const handleSubmit = async (values: UserUpdateRequest) => {
        if (!currentUser) return;

        const updatedFields: Partial<UserUpdateRequest> = {};

        if (values.firstName && values.firstName !== currentUser.firstName) {
            updatedFields.firstName = values.firstName;
        }

        if (values.lastName && values.lastName !== currentUser.lastName) {
            updatedFields.lastName = values.lastName;
        }

        if (values.email && values.email !== currentUser.email) {
            updatedFields.email = values.email;
        }

        if (values.image) {
            updatedFields.image = values.image;
        }

        if (Object.keys(updatedFields).length === 0) {
            setError("Няма направени промени.");
            return;
        }

        try {
            const updatedUser = await updateUser(currentUserId, updatedFields);
            setError(null);
            onUserUpdated(updatedUser);
            setIsVisible(false);
            onClose();
        } catch (error) {
            setError("Неуспешно обновяване на данни!");
        }
    };

    const defaultProfileImageUrl = DEFAULT_USER_PROFILE_ICON;
    const profileImageUrl = getImageUrl(currentUser?.imageUrl);

    return (
        <div className={userUpdateModalStyles.background}>
            <div ref={modalRef} className={`${userUpdateModalStyles.container} ${isVisible ? userUpdateModalStyles.transitionVisible : userUpdateModalStyles.transitionHidden}`}>
                <div className={userUpdateModalStyles.columns}>
                    <div className="flex-1">
                        <h2 className={userUpdateModalStyles.title}>Обновяване на профил</h2>

                        {error && (
                            <div className={userUpdateModalStyles.errorMessage}>
                                <p>{error}</p>
                            </div>
                        )}

                        {currentUser ? (
                            <Formik
                                initialValues={{
                                    firstName: currentUser.firstName || "",
                                    lastName: currentUser.lastName || "",
                                    email: currentUser.email || "",
                                    image: undefined,
                                }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                                validateOnChange={false}
                                validateOnBlur={false}
                            >
                                {
                                    ({ handleSubmit, errors, touched, isSubmitting, setFieldValue }) => {
                                        const firstError = Object.keys(errors).find((field) => touched[field as keyof UserUpdateRequest]);

                                        return (
                                            <Form onSubmit={handleSubmit}>
                                                {firstError && (
                                                    <div className={userUpdateModalStyles.errorMessage}>
                                                        <p>{errors[firstError as keyof typeof errors]}</p>
                                                    </div>
                                                )}

                                                <div className={userUpdateModalStyles.collection}>
                                                    <div className={userUpdateModalStyles.group}>
                                                        <label className={userUpdateModalStyles.label}>Име</label>
                                                        <Field
                                                            name="firstName"
                                                            type="text"
                                                            placeholder="Име"
                                                            className={userUpdateModalStyles.textInput}
                                                        />
                                                    </div>

                                                    <div className={userUpdateModalStyles.group}>
                                                        <label className={userUpdateModalStyles.label}>Фамилия</label>
                                                        <Field
                                                            name="lastName"
                                                            type="text"
                                                            placeholder="Фамилия"
                                                            className={userUpdateModalStyles.textInput}
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className={userUpdateModalStyles.label}>Имейл</label>
                                                    <Field
                                                        name="email"
                                                        placeholder="Имейл"
                                                        className={userUpdateModalStyles.textInput}
                                                    />
                                                </div>

                                                <div>
                                                    <label className={userUpdateModalStyles.label}>Изображение</label>
                                                    <div className={userUpdateModalStyles.items}>
                                                        <label htmlFor="file-upload" className={userUpdateModalStyles.uploadLabel}>
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
                                                            <Button onClick={() => handleClear(setFieldValue)} className={userUpdateModalStyles.clearButton}>
                                                                Изчисти
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className={userUpdateModalStyles.items}>
                                                    <Button onClick={onClose} className={userUpdateModalStyles.cancelButton}>
                                                        Отказ
                                                    </Button>
                                                    <Button type="submit" disabled={isSubmitting} className={userUpdateModalStyles.createButton}>
                                                        Обнови
                                                    </Button>
                                                </div>
                                            </Form>
                                        );
                                    }
                                }
                            </Formik>
                        ) : (
                            <p className={userUpdateModalStyles.paragraph}>Зареждане на потребителски данни.</p>
                        )}
                    </div>

                    <div className="flex-1">
                        <div className={userUpdateModalStyles.imageContainer}>
                            {image ? (
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Преглед"
                                    className={userUpdateModalStyles.image}
                                />
                            ) : currentUser?.imageUrl ? (
                                <img
                                    src={profileImageUrl || defaultProfileImageUrl}
                                    alt="Текущо изображение"
                                    className={userUpdateModalStyles.image}
                                />
                            ) : (
                                <span className="text-gray-500">Няма избрано изображение</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserUpdateModal;
