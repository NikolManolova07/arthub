package com.course_project.arthub_api.dtos.quiz.attempt;

import com.course_project.arthub_api.dtos.quiz.QuizDetailsResponseDTO;
import com.course_project.arthub_api.dtos.user.UserBaseResponseDTO;
import com.course_project.arthub_api.entities.QuizAttempt;
import com.course_project.arthub_api.entities.Status;

import java.time.LocalDateTime;

public class QuizAttemptSubmitResponseDTO {

    private int id;
    private QuizDetailsResponseDTO quizDetails;
    private UserBaseResponseDTO user;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private int score;
    private Status status;

    public QuizAttemptSubmitResponseDTO(QuizAttempt attempt, QuizDetailsResponseDTO quizDetails, UserBaseResponseDTO user) {
        this.id = attempt.getId();
        this.quizDetails = quizDetails;
        this.user = user;
        this.startTime = attempt.getStartTime();
        this.endTime = attempt.getEndTime();
        this.score = attempt.getScore();
        this.status = attempt.getStatus();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public QuizDetailsResponseDTO getQuizDetails() {
        return quizDetails;
    }

    public void setQuizDetails(QuizDetailsResponseDTO quizDetails) {
        this.quizDetails = quizDetails;
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

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
