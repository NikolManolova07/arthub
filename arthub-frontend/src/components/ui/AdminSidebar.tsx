import { sidebarStyles } from "../../styles/styles";
import Button from "./Button";

interface AdminSidebarProps {
    onSelectSection: (section: "users" | "posts" | "quizzes" | "categories") => void;
}

function AdminSidebar({ onSelectSection }: AdminSidebarProps) {
    return (
        <aside className={sidebarStyles.sidebar}>
            <div className={sidebarStyles.container}>
                <div className={sidebarStyles.group}>
                    <h3 className={sidebarStyles.title}>ПОТРЕБИТЕЛИ</h3>
                    <Button
                        onClick={() => onSelectSection("users")}
                        className={sidebarStyles.createButton}
                    >
                        Преглед на потребители
                    </Button>
                </div>
            </div>

            <div className={sidebarStyles.container}>
                <div className={sidebarStyles.group}>
                    <h3 className={sidebarStyles.title}>ПОСТОВЕ И КАТЕГОРИИ</h3>
                    <div className={sidebarStyles.items}>
                        <Button
                            onClick={() => onSelectSection("posts")}
                            className={sidebarStyles.createButton}
                        >
                            Преглед на постове
                        </Button>
                        
                        <Button
                            onClick={() => onSelectSection("categories")}
                            className={sidebarStyles.createButton}
                        >
                            Преглед на категории
                        </Button>
                    </div>
                </div>
            </div>

            <div className={sidebarStyles.container}>
                <div className={sidebarStyles.group}>
                    <h3 className={sidebarStyles.title}>КУИЗОВЕ</h3>
                    <Button
                        onClick={() => onSelectSection("quizzes")}
                        className={sidebarStyles.createButton}
                    >
                        Преглед на куизове
                    </Button>
                </div>
            </div>
        </aside>
    );
}

export default AdminSidebar;
