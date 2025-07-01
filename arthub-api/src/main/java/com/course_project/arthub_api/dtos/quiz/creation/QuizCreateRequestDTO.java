package com.course_project.arthub_api.dtos.quiz.creation;

import com.course_project.arthub_api.entities.Level;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class QuizCreateRequestDTO {

    @NotBlank(message = "Title cannot be blank")
    private String title;

    private String description;

    @NotNull(message = "Duration cannot be null")
    private Integer duration;

    @NotNull(message = "Level cannot be null")
    private Level level;

    public QuizCreateRequestDTO(String title, String description, Integer duration, Level level) {
        this.title = title;
        this.description = description;
        this.duration = duration;
        this.level = level;
    }

    public @NotBlank(message = "Title cannot be blank") String getTitle() {
        return title;
    }

    public void setTitle(@NotBlank(message = "Title cannot be blank") String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public @NotNull(message = "Duration cannot be null") Integer getDuration() {
        return duration;
    }

    public void setDuration(@NotNull(message = "Duration cannot be null") Integer duration) {
        this.duration = duration;
    }

    public @NotNull(message = "Level cannot be null") Level getLevel() {
        return level;
    }

    public void setLevel(@NotNull(message = "Level cannot be null") Level level) {
        this.level = level;
    }
}
