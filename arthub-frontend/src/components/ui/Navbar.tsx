import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { navbarStyles } from "../../styles/styles";
import { getMe, logout } from "../../api/authApi";
import { FiLogOut } from "react-icons/fi";
import Button from "./Button";

function Navbar() {
    const { isAuthenticated, role } = useAuth();
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await getMe();
                setUsername(user.username);
            } catch (error) {
                console.error("Неуспешно зареждане на данни за логнат потребител!", error);
            }
        };
        if (isAuthenticated) {
            fetchUserData();
        }
    }, [isAuthenticated]);

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error("Неуспешен изход!", error);
        }
    };

    return (
        <nav className={navbarStyles.navbar}>
            <div className={navbarStyles.container}>
                <Link to="/home" className={navbarStyles.homeText}><span className="text-beige">Art</span>Hub</Link>

                <div className={navbarStyles.items}>
                    {isAuthenticated ? (
                        <>
                            <Link to="/main" className={navbarStyles.link}>Начало</Link>
                            <Link to="/profile" className={navbarStyles.link}>Профил</Link>
                            {role === "ADMIN" && (
                                <Link to="/admin" className={navbarStyles.adminLink}>Админ</Link>
                            )}
                            <p className={navbarStyles.helloMessage}>Здравей, {username}!</p>
                            <Button onClick={handleLogout} className={navbarStyles.button} icon={<FiLogOut />}>
                                Изход
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link to="/register" className={navbarStyles.link}>Регистрация</Link>
                            <Link to="/login" className={navbarStyles.link}>Вход</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
