import { useEffect, useRef, useState } from "react";
import { User, UserDetails } from "../../types/types";
import { userDetailsModalStyles } from "../../styles/styles";
import { getUserById } from "../../api/userApi";
import { DEFAULT_USER_PROFILE_ICON } from "../../api/constants";
import { getImageUrl } from "../../helpers/functions";

interface UserDetailsModalProps {
    currentUserId: number;
    onClose: () => void;
}

function UserDetailsModal({ currentUserId, onClose }: UserDetailsModalProps) {
    const [currentUser, setCurrentUser] = useState<UserDetails>();
    const [followers, setFollowers] = useState<User[]>([]);
    const [following, setFollowing] = useState<User[]>([]);
    
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
        const fetchUserData = async () => {
            try {
                const user = await getUserById(currentUserId);
                setError(null);
                setCurrentUser(user);
                setFollowers(user.followers);
                setFollowing(user.following);
            } catch (error) {
                setError("Неуспешно зареждане на данни за логнат потребител!");
            }
        };
        if (currentUserId) {
            fetchUserData();
        }
    }, [currentUserId]);

    const followersCount = currentUser?.followersCount;
    const followingCount = currentUser?.followingCount;

    return (
        <div className={userDetailsModalStyles.background}>
            <div ref={modalRef} className={`${userDetailsModalStyles.container} ${isVisible ? userDetailsModalStyles.transitionVisible : userDetailsModalStyles.transitionHidden}`}>
                <h2 className={userDetailsModalStyles.title}>Детайли</h2>

                {error && (
                    <div>
                        <p className={userDetailsModalStyles.errorMessage}>{error}</p>
                    </div>
                )}

                <h3 className={userDetailsModalStyles.subtitleFollowers}>Последователи ({followersCount})</h3>

                {followers.length > 0 ? (
                    <div className={userDetailsModalStyles.usersSection}>
                        {followers.map((follower) => {
                            const defaultProfileImageUrl = DEFAULT_USER_PROFILE_ICON;
                            const profileImageUrl = getImageUrl(follower.imageUrl);

                            return (
                                <div key={follower.id} className={userDetailsModalStyles.follower}>
                                    <div className={userDetailsModalStyles.user}>
                                        <img
                                            src={profileImageUrl || defaultProfileImageUrl}
                                            alt="Профилна снимка"
                                            className={userDetailsModalStyles.profileImage}
                                            onError={(e) => e.currentTarget.style.display = "none"}
                                        />

                                        <div className={userDetailsModalStyles.group}>
                                            {follower.firstName} {follower.lastName}
                                            <span className={userDetailsModalStyles.username}>@{follower.username}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <p className={userDetailsModalStyles.paragraph}>Няма последователи.</p>
                )}

                <h3 className={userDetailsModalStyles.subtitleFollowings}>Последвани ({followingCount})</h3>

                {following.length > 0 ? (
                    <div className={userDetailsModalStyles.usersSection}>
                        {following.map((following) => {
                            const defaultProfileImageUrl = DEFAULT_USER_PROFILE_ICON;
                            const profileImageUrl = getImageUrl(following.imageUrl);

                            return (
                                <div key={following.id} className={userDetailsModalStyles.following}>
                                    <div className={userDetailsModalStyles.user}>
                                        <img
                                            src={profileImageUrl || defaultProfileImageUrl}
                                            alt="Профилна снимка"
                                            className={userDetailsModalStyles.profileImage}
                                            onError={(e) => e.currentTarget.style.display = "none"}
                                        />

                                        <div className={userDetailsModalStyles.group}>
                                            {following.firstName} {following.lastName}
                                            <span className={userDetailsModalStyles.username}>@{following.username}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <p className={userDetailsModalStyles.paragraph}>Няма последвани.</p>
                )}
            </div>
        </div>
    );
};

export default UserDetailsModal;
