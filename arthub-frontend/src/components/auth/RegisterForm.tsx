import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormRegisterRequest } from '../../types/types';
import { formStyles } from "../../styles/styles";
import { register } from "../../api/authApi";
import Button from "../ui/Button";

function RegisterForm() {
    const [registerError, setRegisterError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate();

    const initialValues: FormRegisterRequest = {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        username: Yup.string()
            .required("Потребителското име е задължително!"),
        firstName: Yup.string()
            .required("Името е задължително!"),
        lastName: Yup.string()
            .required("Фамилията е задължителна!"),
        email: Yup.string()
            .email("Невалиден имейл адрес!")
            .required("Имейлът е задължителен!"),
        password: Yup.string()
            .min(3, "Паролата трябва да е поне 3 символа!")
            .required("Паролата е задължителна!")
    });

    const handleSubmit = async (values: FormRegisterRequest) => {
        try {
            await register(values);
            setRegisterError(null);
            setSuccess("Успешна регистрация! Пренасочване към вход в системата...");
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            setTimeout(() => setRegisterError("Неуспешна регистрация!"), 1000);
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
        >
            {
                ({ handleSubmit, errors, touched, isSubmitting }) => {
                    const firstError = Object.keys(errors).find((field) => touched[field as keyof FormRegisterRequest]);

                    return (
                        <Form onSubmit={handleSubmit} className={formStyles.container}>
                            <h2 className={formStyles.title}>Създаване<br />на нов профил</h2>

                            {firstError && (
                                <div className={formStyles.errorMessage}>
                                    <p>{errors[firstError as keyof typeof errors]}</p>
                                </div>
                            )}

                            {registerError && (
                                <div className={formStyles.errorMessage}>
                                    <p>{registerError}</p>
                                </div>
                            )}

                            {success && (
                                <div className={formStyles.successMessage}>
                                    <p>{success.split('!')[0]}!<br />{success.split('!')[1]}</p>
                                </div>
                            )}

                            <div className={formStyles.fields}>
                                <Field
                                    name="username"
                                    type="text"
                                    placeholder="Потребителско име"
                                    className={formStyles.input}
                                />
                                <Field
                                    name="firstName"
                                    type="text"
                                    placeholder="Име"
                                    className={formStyles.input}
                                />
                                <Field
                                    name="lastName"
                                    type="text"
                                    placeholder="Фамилия"
                                    className={formStyles.input}
                                />
                                <Field
                                    name="email"
                                    placeholder="Имейл"
                                    className={formStyles.input}
                                />
                                <Field
                                    name="password"
                                    type="password"
                                    placeholder="Парола"
                                    className={formStyles.input}
                                />
                            </div>

                            <Button type="submit" className={formStyles.button} disabled={isSubmitting}>
                                Регистрация
                            </Button>

                            <p className={formStyles.paragraph}>
                                Вече имате профил? <a href="/login" className={formStyles.link}>Влизане</a>
                            </p>
                        </Form>
                    );
                }
            }
        </Formik>
    );
}

export default RegisterForm;
