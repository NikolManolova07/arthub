import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { User, UserDetails } from "../../types/types";
import { getUserById } from "../../api/userApi";
import { userProfileStyles } from "../../styles/styles";
import { DEFAULT_USER_PROFILE_ICON } from "../../api/constants";
import { getImageUrl } from "../../helpers/functions";
import Button from "../ui/Button";
import UserUpdateModal from "./UserUpdateModal";

function UserProfileContainer() {
    const { userId } = useAuth();
    const currentUserId = Number(userId);

    const [isUserUpdateModalOpen, setUserUpdateModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<UserDetails>();
    const [followers, setFollowers] = useState<User[]>([]);
    const [following, setFollowing] = useState<User[]>([]);
    
    const [error, setError] = useState<string | null>(null);
    const scrollRefFollowers = useRef<HTMLDivElement | null>(null);
    const scrollRefFollowing = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchUserData();
            } catch (error) {
                setError("Неуспешно зареждане на данни!");
            }
        };
        if (currentUserId) {
            fetchData();
        }
    }, [currentUserId]);

    useEffect(() => {
        const followersContainer = scrollRefFollowers.current;
        const followingContainer = scrollRefFollowing.current;
        
        if (!followersContainer || !followingContainer) return;

        // Handle the scroll behavior for the div.
        const handleWheel = (e: WheelEvent, targetRef: React.RefObject<HTMLDivElement | null>) => {
            if (e.deltaY === 0) return;
            e.preventDefault();
            const container = targetRef.current;
            if (container) {
                container.scrollBy({
                    left: e.deltaY,  // Scroll horizontally based on vertical scroll.
                    behavior: "smooth",  // Smooth scroll.
                });
            }
        };

        // Add the event listener for the followers and following containers.
        followersContainer.addEventListener("wheel", (e) => handleWheel(e, scrollRefFollowers), { passive: false });
        followingContainer.addEventListener("wheel", (e) => handleWheel(e, scrollRefFollowing), { passive: false });

        return () => {
            // Clean up the event listeners when the component unmounts.
            followersContainer.removeEventListener("wheel", (e) => handleWheel(e, scrollRefFollowers));
            followingContainer.removeEventListener("wheel", (e) => handleWheel(e, scrollRefFollowing));
        };
    }, []);

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

    const refresh = async () => {
        await fetchUserData();
    };

    const followersCount = currentUser?.followersCount;
    const followingCount = currentUser?.followingCount;

    return (
        <div className={userProfileStyles.main}>
            <div className={userProfileStyles.mainPanel}>
                <div className={userProfileStyles.container}>
                    <h2 className={userProfileStyles.title}>Профил</h2>

                    {error && (
                        <div className={userProfileStyles.errorMessage}>
                            <p>{error}</p>
                        </div>
                    )}

                    {currentUser ? (
                        <div className={userProfileStyles.userProfile}>
                            <div className={userProfileStyles.user}>
                                <img
                                    src={getImageUrl(currentUser.imageUrl) || DEFAULT_USER_PROFILE_ICON}
                                    alt="Профилна снимка"
                                    className={userProfileStyles.profileImage}
                                    onError={(e) => e.currentTarget.style.display = "none"}
                                />

                                <div className={userProfileStyles.group}>
                                    {currentUser.firstName} {currentUser.lastName}
                                    <span className={userProfileStyles.username}>@{currentUser.username}</span>
                                </div>
                            </div>

                            <Button onClick={() => setUserUpdateModalOpen(true)} className={userProfileStyles.updateButton}>
                                Обнови
                            </Button>
                        </div>
                    ) : (
                        <p className={userProfileStyles.paragraph}>Няма налични потребителски данни.</p>
                    )}

                    <h3 className={userProfileStyles.subtitle}>Последователи ({followersCount})</h3>
                    <div ref={scrollRefFollowers} className={userProfileStyles.usersSection}>
                        {followers.length > 0 ? (
                            <div className={userProfileStyles.followers}>
                                {followers.map((follower) => {
                                    const defaultProfileImageUrl = DEFAULT_USER_PROFILE_ICON;
                                    const profileImageUrl = getImageUrl(follower.imageUrl);

                                    return (
                                        <div key={follower.id} className={userProfileStyles.follower}>
                                            <div className={userProfileStyles.user}>
                                                <img
                                                    src={profileImageUrl || defaultProfileImageUrl}
                                                    alt="Профилна снимка"
                                                    className={userProfileStyles.profileImage}
                                                    onError={(e) => e.currentTarget.style.display = "none"}
                                                />

                                                <div className={userProfileStyles.group}>
                                                    {follower.firstName} {follower.lastName}
                                                    <span className={userProfileStyles.username}>@{follower.username}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <p className={userProfileStyles.paragraph}>Няма последователи.</p>
                        )}
                    </div>

                    <h3 className={userProfileStyles.subtitle}>Последвани ({followingCount})</h3>
                    <div ref={scrollRefFollowing} className={userProfileStyles.usersSection}>
                        {following.length > 0 ? (
                            <div className={userProfileStyles.followers}>
                                {following.map((following) => {
                                    const defaultProfileImageUrl = DEFAULT_USER_PROFILE_ICON;
                                    const profileImageUrl = getImageUrl(following.imageUrl);

                                    return (
                                        <div key={following.id} className={userProfileStyles.follower}>
                                            <div className={userProfileStyles.user}>
                                                <img
                                                    src={profileImageUrl || defaultProfileImageUrl}
                                                    alt="Профилна снимка"
                                                    className={userProfileStyles.profileImage}
                                                    onError={(e) => e.currentTarget.style.display = "none"}
                                                />

                                                <div className={userProfileStyles.group}>
                                                    {following.firstName} {following.lastName}
                                                    <span className={userProfileStyles.username}>@{following.username}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <p className={userProfileStyles.paragraph}>Няма последвани.</p>
                        )}
                    </div>
                </div>
            </div>

            {isUserUpdateModalOpen && <UserUpdateModal currentUserId={currentUserId} onUserUpdated={refresh} onClose={() => setUserUpdateModalOpen(false)} />}
        </div>
    );
};

export default UserProfileContainer;
