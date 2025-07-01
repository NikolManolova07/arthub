import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostDetails } from "../../types/types";
import { sidebarStyles } from "../../styles/styles";
import Button from "./Button";
import PostCreateModal from "../post/PostCreateModal";
import UserFollowModal from "../user/UserFollowModal";

interface SidebarProps {
    currentUserId: number;
    onPostCreated: (newPost: PostDetails) => void;
    onFollow: (userId: number) => void;
    onUnfollow: (userId: number) => void;
}

function Sidebar({ currentUserId, onPostCreated, onFollow, onUnfollow }: SidebarProps) {
    const [isPostCreateModalOpen, setPostCreateModalOpen] = useState(false);
    const [isUserFollowModalOpen, setUserFollowModalOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <aside className={sidebarStyles.sidebar}>
            <div className={sidebarStyles.container}>
                <div className={sidebarStyles.group}>
                    <h3 className={sidebarStyles.title}>ПОСТОВЕ</h3>
                    <Button onClick={() => setPostCreateModalOpen(true)} className={sidebarStyles.createButton}>
                        Създай пост
                    </Button>
                </div>
            </div>

            <div className={sidebarStyles.container}>
                <div className={sidebarStyles.group}>
                    <h3 className={sidebarStyles.title}>КУИЗОВЕ</h3>
                    <div className={sidebarStyles.items}>
                        <Button onClick={() => navigate("/create-quiz")} className={sidebarStyles.createButton}>
                            Cъздай куиз
                        </Button>
                        
                        <Button onClick={() => navigate("/solve-quiz")} className={sidebarStyles.solveButton}>
                            Реши куиз
                        </Button>
                    </div>
                </div>
            </div>

            <div className={sidebarStyles.container}>
                <div className={sidebarStyles.group}>
                    <h3 className={sidebarStyles.title}>ПОТРЕБИТЕЛИ</h3>
                    <Button onClick={() => setUserFollowModalOpen(true)} className={sidebarStyles.createButton}>
                        Последвай потребител
                    </Button>
                </div>
            </div>

            {isPostCreateModalOpen && <PostCreateModal onPostCreated={onPostCreated} onClose={() => setPostCreateModalOpen(false)} />}
            {isUserFollowModalOpen && <UserFollowModal currentUserId={currentUserId} onFollow={onFollow} onUnfollow={onUnfollow} onClose={() => setUserFollowModalOpen(false)} />}
        </aside>
    );
};

export default Sidebar;
