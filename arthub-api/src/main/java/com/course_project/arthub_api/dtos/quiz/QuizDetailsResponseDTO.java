package com.course_project.arthub_api.dtos.quiz;

import com.course_project.arthub_api.dtos.quiz.question.QuestionResponseDTO;
import com.course_project.arthub_api.dtos.user.UserBaseResponseDTO;
import com.course_project.arthub_api.entities.Level;
import com.course_project.arthub_api.entities.Quiz;

import java.time.LocalDateTime;
import java.util.List;

public class QuizDetailsResponseDTO {

    private int id;
    private UserBaseResponseDTO createdBy;
    private String title;
    private String description;
    private int duration;
    private Level level;
    private LocalDateTime createdAt;
    private int questionsCount;
    private List<QuestionResponseDTO> questions;

    public QuizDetailsResponseDTO(Quiz quiz, UserBaseResponseDTO createdBy, int questionsCount, List<QuestionResponseDTO> questions) {
        this.id = quiz.getId();
        this.createdBy = createdBy;
        this.title = quiz.getTitle();
        this.description = quiz.getDescription();
        this.duration = quiz.getDuration();
        this.level = quiz.getLevel();
        this.questionsCount = questionsCount;
        this.questions = questions;
        this.createdAt = quiz.getCreatedAt();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public UserBaseResponseDTO getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(UserBaseResponseDTO createdBy) {
        this.createdBy = createdBy;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public Level getLevel() {
        return level;
    }

    public void setLevel(Level level) {
        this.level = level;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public int getQuestionsCount() {
        return questionsCount;
    }

    public void setQuestionsCount(int questionsCount) {
        this.questionsCount = questionsCount;
    }

    public List<QuestionResponseDTO> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionResponseDTO> questions) {
        this.questions = questions;
    }
}
