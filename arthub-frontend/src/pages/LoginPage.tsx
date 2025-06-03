import { baseStyles } from "../styles/styles";
import LoginForm from "../components/auth/LoginForm";

function LoginPage() {
    return (
        <div className={baseStyles.background}>
            <LoginForm />
        </div>
    );
};

export default LoginPage;
