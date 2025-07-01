package com.course_project.arthub_api.dtos.quiz.creation;

import com.course_project.arthub_api.entities.Level;
import com.course_project.arthub_api.entities.Quiz;

public class QuizCreatedResponseDTO {

    private int id;
    private String title;
    private String description;
    private int duration;
    private Level level;
    private int questionsCount;

    public QuizCreatedResponseDTO(Quiz quiz, int questionsCount) {
        this.id = quiz.getId();
        this.title = quiz.getTitle();
        this.description = quiz.getDescription();
        this.duration = quiz.getDuration();
        this.level = quiz.getLevel();
        this.questionsCount = questionsCount;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public int getQuestionsCount() {
        return questionsCount;
    }

    public void setQuestionsCount(int questionsCount) {
        this.questionsCount = questionsCount;
    }
}
