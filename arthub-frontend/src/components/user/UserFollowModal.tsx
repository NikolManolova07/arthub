import { useEffect, useRef, useState } from "react";
import { User } from "../../types/types";
import { userModalStyles } from "../../styles/styles";
import { followUser, getUserFollowing, searchUsers, unfollowUser } from "../../api/userApi";
import { DEFAULT_USER_PROFILE_ICON } from "../../api/constants";
import { getImageUrl } from "../../helpers/functions";
import Button from "../ui/Button";

interface UserFollowModalProps {
    currentUserId: number;
    onFollow: (userId: number) => void;
    onUnfollow: (userId: number) => void;
    onClose: () => void;
}

function UserFollowModal({ currentUserId, onFollow, onUnfollow, onClose }: UserFollowModalProps) {
    const [keyword, setKeyword] = useState<string>("");
    const [users, setUsers] = useState<User[]>([]);
    const [followedUsers, setFollowedUsers] = useState<User[]>([]);
    
    const [error, setError] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);

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
        const fetchFollowing = async () => {
            try {
                const data = await getUserFollowing(currentUserId);
                setError(null);
                setFollowedUsers(data);
            } catch (error) {
                setError("Неуспешно зареждане на последвани потребители!");
            }
        };
        fetchFollowing();
    }, [currentUserId]);

    useEffect(() => {
        if (keyword.trim() === "") {
            setUsers([]);
            return;
        }
        handleSearch();
    }, [keyword]);

    const handleSearch = async () => {
        setError(null);
        if (keyword.trim() === "") {
            setUsers([]);
            return;
        }
        try {
            const data = await searchUsers(keyword);
            setUsers(data);
        } catch (error) {
            setError("Неуспешно зареждане на потребители!");
        }
    };

    const handleFollow = async (userId: number) => {
        try {
            const userToFollow = users.find((user) => user.id === userId);
            if (userToFollow) {
                await followUser(userId);
                setFollowedUsers((prevState) => [...prevState, userToFollow]);
            }
            setError(null);
            onFollow(userId);
        } catch (error) {
            setError("Неуспешно последване!");
        }
    };

    const handleUnfollow = async (userId: number) => {
        try {
            await unfollowUser(userId);
            setFollowedUsers((prevState) =>
                prevState.filter((user) => user.id !== userId)
            );
            setError(null);
            onUnfollow(userId);
        } catch (error) {
            setError("Неуспешно премахване на последване!");
        }
    };

    return (
        <div className={userModalStyles.background}>
            <div ref={modalRef} className={`${userModalStyles.container} ${isVisible ? userModalStyles.transitionVisible : userModalStyles.transitionHidden}`}>
                <h2 className={userModalStyles.title}>Последване на потребител</h2>

                {error && (
                    <div>
                        <p className={userModalStyles.errorMessage}>{error}</p>
                    </div>
                )}

                <input
                    type="text"
                    placeholder="Търси потребител..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className={userModalStyles.search}
                />

                {users.length > 0 ? (
                    <div className={userModalStyles.usersSection}>
                        {users.map((user) => {
                            const defaultProfileImageUrl = DEFAULT_USER_PROFILE_ICON;
                            const profileImageUrl = getImageUrl(user.imageUrl);

                            return (
                                <div key={user.id} className={userModalStyles.user}>
                                    <div className={userModalStyles.userDetails}>
                                        <img
                                            src={profileImageUrl || defaultProfileImageUrl}
                                            alt="Профилна снимка"
                                            className={userModalStyles.profileImage}
                                            onError={(e) => e.currentTarget.style.display = "none"}
                                        />
                                        {user.firstName} {user.lastName}
                                    </div>

                                    <div className={userModalStyles.userFollow}>
                                        {followedUsers.some((followedUser) => followedUser.id === user.id) ? (
                                            <Button
                                                onClick={() => handleUnfollow(user.id)}
                                                className={userModalStyles.unfollowButton}
                                            >
                                                Не следвай
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={() => handleFollow(user.id)}
                                                className={userModalStyles.followButton}
                                            >
                                                Последвай
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    keyword.trim() !== "" && <p className={userModalStyles.paragraph}>Няма намерени резултати.</p>
                )}
            </div>
        </div>
    );
};

export default UserFollowModal;
