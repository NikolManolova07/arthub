package com.course_project.arthub_api.dtos.user;

public class LeaderboardResponseDTO {

    private UserBaseResponseDTO user;
    private Long totalScore;

    public LeaderboardResponseDTO(UserBaseResponseDTO user, Long totalScore) {
        this.user = user;
        this.totalScore = totalScore;
    }

    public UserBaseResponseDTO getUser() {
        return user;
    }

    public void setUser(UserBaseResponseDTO user) {
        this.user = user;
    }

    public Long getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(Long totalScore) {
        this.totalScore = totalScore;
    }
}
