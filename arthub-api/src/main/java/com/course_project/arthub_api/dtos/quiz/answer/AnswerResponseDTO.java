package com.course_project.arthub_api.dtos.quiz.answer;

import com.course_project.arthub_api.entities.Answer;

public class AnswerResponseDTO {

    private int id;
    private String answerContent;

    public AnswerResponseDTO(Answer answer) {
        this.id = answer.getId();
        this.answerContent = answer.getAnswerContent();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAnswerContent() {
        return answerContent;
    }

    public void setAnswerContent(String answerContent) {
        this.answerContent = answerContent;
    }
}
