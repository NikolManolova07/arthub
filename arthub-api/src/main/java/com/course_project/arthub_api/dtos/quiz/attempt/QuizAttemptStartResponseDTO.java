package com.course_project.arthub_api.dtos.quiz.attempt;

import com.course_project.arthub_api.dtos.quiz.QuizDetailsResponseDTO;
import com.course_project.arthub_api.dtos.user.UserBaseResponseDTO;
import com.course_project.arthub_api.entities.QuizAttempt;
import com.course_project.arthub_api.entities.Status;

import java.time.LocalDateTime;

public class QuizAttemptStartResponseDTO {

    private int id;
    private QuizDetailsResponseDTO quizDetails;
    private UserBaseResponseDTO user;
    private LocalDateTime startTime;
    private Status status;

    public QuizAttemptStartResponseDTO(QuizAttempt attempt, QuizDetailsResponseDTO quizDetails, UserBaseResponseDTO user) {
        this.id = attempt.getId();
        this.quizDetails = quizDetails;
        this.user = user;
        this.startTime = attempt.getStartTime();
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

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
