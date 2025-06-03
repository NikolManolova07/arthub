package com.course_project.arthub_api.dtos.quiz.answer;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class AnswerCreateRequestDTO {

    @NotNull(message = "Question id cannot be null")
    private Integer questionId;

    @NotBlank(message = "Answer cannot be blank")
    private String answerContent;

    @NotNull(message = "Is correct cannot be null")
    private Boolean isCorrect;

    public AnswerCreateRequestDTO(Integer questionId, String answerContent, Boolean isCorrect) {
        this.questionId = questionId;
        this.answerContent = answerContent;
        this.isCorrect = isCorrect;
    }

    public @NotNull(message = "Question cannot be null") Integer getQuestionId() {
        return questionId;
    }

    public void setQuestionId(@NotNull(message = "Question cannot be null") Integer questionId) {
        this.questionId = questionId;
    }

    public @NotBlank(message = "Answer cannot be blank") String getAnswerContent() {
        return answerContent;
    }

    public void setAnswerContent(@NotBlank(message = "Answer cannot be blank") String answerContent) {
        this.answerContent = answerContent;
    }

    public @NotNull(message = "Is correct cannot be null") Boolean getCorrect() {
        return isCorrect;
    }

    public void setCorrect(@NotNull(message = "Is correct cannot be null") Boolean correct) {
        isCorrect = correct;
    }
}
