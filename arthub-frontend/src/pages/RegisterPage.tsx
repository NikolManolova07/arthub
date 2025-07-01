import { baseStyles } from "../styles/styles";
import RegisterForm from "../components/auth/RegisterForm";

function RegisterPage() {
    return (
        <div className={baseStyles.background}>
            <RegisterForm />
        </div>
    );
};

export default RegisterPage;
