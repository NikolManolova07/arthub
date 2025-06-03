package com.course_project.arthub_api.dtos.quiz.attempt;

import jakarta.validation.constraints.NotNull;

public class QuestionAnswerRequestDTO {

    @NotNull(message = "Question id cannot be null")
    private Integer questionId;

    @NotNull(message = "Answer id cannot be null")
    private Integer answerId;

    public QuestionAnswerRequestDTO(int questionId, int answerId) {
        this.questionId = questionId;
        this.answerId = answerId;
    }

    public @NotNull(message = "Question id cannot be null") Integer getQuestionId() {
        return questionId;
    }

    public void setQuestionId(@NotNull(message = "Question id cannot be null") Integer questionId) {
        this.questionId = questionId;
    }

    public @NotNull(message = "Answer id cannot be null") Integer getAnswerId() {
        return answerId;
    }

    public void setAnswerId(@NotNull(message = "Answer id cannot be null") Integer answerId) {
        this.answerId = answerId;
    }
}
