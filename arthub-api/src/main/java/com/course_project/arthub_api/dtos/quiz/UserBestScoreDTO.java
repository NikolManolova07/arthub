package com.course_project.arthub_api.dtos.quiz;

import com.course_project.arthub_api.dtos.user.UserBaseResponseDTO;

import java.time.LocalDateTime;

public class UserBestScoreDTO {

    private UserBaseResponseDTO user;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private int score;

    public UserBestScoreDTO(UserBaseResponseDTO user, LocalDateTime startTime, LocalDateTime endTime, int score) {
        this.user = user;
        this.startTime = startTime;
        this.endTime = endTime;
        this.score = score;
    }

    public UserBaseResponseDTO getUser() {
        return user;
    }

    public void setUser(UserBaseResponseDTO user) {
        this.user = user;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }
}
