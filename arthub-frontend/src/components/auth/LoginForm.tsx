import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FormLoginRequest } from '../../types/types';
import { formStyles } from "../../styles/styles";
import { login } from "../../api/authApi";
import Button from "../ui/Button";

function LoginForm() {
    const [loginError, setLoginError] = useState<string | null>(null);
    const navigate = useNavigate();

    const initialValues: FormLoginRequest = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object({
        username: Yup.string()
            .required("Потребителското име е задължително!"),
        password: Yup.string()
            .required("Паролата е задължителна!")
    });

    const handleSubmit = async (values: FormLoginRequest) => {
        try {
            await login(values);
            setLoginError(null);
            navigate("/main");
        } catch (error) {
            setTimeout(() => setLoginError("Невалидно потребителско име или парола!"), 1000);
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
                    const firstError = Object.keys(errors).find((field) => touched[field as keyof FormLoginRequest]);

                    return (
                        <Form onSubmit={handleSubmit} className={formStyles.container}>
                            <h2 className={formStyles.title}>Добре дошли!</h2>

                            {firstError && (
                                <div className={formStyles.errorMessage}>
                                    <p>{errors[firstError as keyof typeof errors]}</p>
                                </div>
                            )}

                            {loginError && (
                                <div className={formStyles.errorMessage}>
                                    <p>{loginError}</p>
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
                                    name="password"
                                    type="password"
                                    placeholder="Парола"
                                    className={formStyles.input}
                                />
                            </div>

                            <Button type="submit" className={formStyles.button} disabled={isSubmitting}>
                                Влизане
                            </Button>

                            <p className={formStyles.paragraph}>
                                Нямате профил? <a href="/register" className={formStyles.link}>Регистрирай се!</a>
                            </p>
                        </Form>
                    );
                }
            }
        </Formik>
    );
};

export default LoginForm;
