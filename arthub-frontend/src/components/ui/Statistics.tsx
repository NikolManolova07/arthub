import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Leaderboard, UserDetails } from "../../types/types";
import { statisticsStyles } from "../../styles/styles";
import { getLeaderboard, getUserById } from "../../api/userApi";
import { DEFAULT_USER_PROFILE_ICON } from "../../api/constants";
import { getImageUrl } from "../../helpers/functions";
import Button from "./Button";
import UserDetailsModal from "../user/UserDetailsModal";

interface StatisticsProps {
    currentUserId: number;
}

function Statistics({ currentUserId }: StatisticsProps) {
    const [isUserDetailsModalOpen, setUserDetailsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<UserDetails>();
    const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);
    
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const data = await getLeaderboard();
                setError(null);
                setLeaderboard(data);
            } catch (error) {
                setError("Неуспешно зареждане на резултатите!");
            }
        };
        fetchLeaderboard();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await getUserById(currentUserId);
                setError(null);
                setCurrentUser(user);
            } catch (error) {
                setError("Неуспешно зареждане на данни за логнат потребител!");
            }
        };
        if (currentUserId) {
            fetchUserData();
        }
    }, [currentUserId]);

    return (
        <div className={statisticsStyles.statistics}>
            <div className={statisticsStyles.container}>
                <div className={statisticsStyles.group}>
                    <h3 className={statisticsStyles.title}>РЕЗУЛТАТИ</h3>

                    {error && (
                        <div>
                            <p className={statisticsStyles.errorMessage}>{error}</p>
                        </div>
                    )}

                    {leaderboard.length > 0 ? (
                        <div>
                            <div className={statisticsStyles.headerRow}>
                                <div>№</div>
                                <div>Потребител</div>
                                <div>Резултат</div>
                            </div>

                            <div className={statisticsStyles.usersSection}>
                                {leaderboard.map((leader, index) => {
                                    const defaultProfileImageUrl = DEFAULT_USER_PROFILE_ICON;
                                    const profileImageUrl = getImageUrl(leader.user.imageUrl);
                                    const rowClass = index % 2 === 0 ? statisticsStyles.evenRow : statisticsStyles.oddRow;

                                    return (
                                        <div key={leader.user.id} className={`${statisticsStyles.userCard} ${rowClass}`}>
                                            <div className={statisticsStyles.user}>
                                                <div className={statisticsStyles.rank}>
                                                    {index + 1}
                                                </div>

                                                <img
                                                    src={profileImageUrl || defaultProfileImageUrl}
                                                    alt="Профилна снимка"
                                                    className={statisticsStyles.profileImage}
                                                    onError={(e) => e.currentTarget.style.display = "none"}
                                                />

                                                <div className={statisticsStyles.userGroup}>
                                                    {leader.user.firstName} {leader.user.lastName}
                                                    <span className={statisticsStyles.username}>@{leader.user.username}</span>
                                                </div>

                                                <div className={statisticsStyles.totalScore}>
                                                    {leader.totalScore}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <p className={statisticsStyles.paragraph}>Няма резултати за показване.</p>
                    )}

                    <Button onClick={() => navigate("/quiz-results")} className={statisticsStyles.statisticsButton}>
                        Детайли
                    </Button>
                </div>
            </div>

            <div className={statisticsStyles.container}>
                <div className={statisticsStyles.group}>
                    <h3 className={statisticsStyles.title}>ПОТРЕБИТЕЛ</h3>

                    {error && (
                        <div>
                            <p className={statisticsStyles.errorMessage}>{error}</p>
                        </div>
                    )}

                    {currentUser ? (
                        <div className={statisticsStyles.userDetails}>
                            <img
                                src={getImageUrl(currentUser.imageUrl) || DEFAULT_USER_PROFILE_ICON}
                                alt="Profile Image"
                                className={statisticsStyles.profileImage}
                                onError={(e) => e.currentTarget.style.display = "none"}
                            />

                            <div className={statisticsStyles.userGroup}>
                                {currentUser.firstName} {currentUser.lastName}
                                <span className={statisticsStyles.username}>@{currentUser.username}</span>
                            </div>

                            <Button onClick={() => setUserDetailsModalOpen(true)} className={statisticsStyles.userDetailsButton}>
                                Детайли
                            </Button>
                        </div>
                    ) : (
                        <p className={statisticsStyles.paragraph}>Няма налични потребителски данни.</p>
                    )}
                </div>
            </div>

            {isUserDetailsModalOpen && <UserDetailsModal currentUserId={currentUserId} onClose={() => setUserDetailsModalOpen(false)} />}
        </div>
    );
};

export default Statistics;
