package com.course_project.arthub_api.dtos.quiz.question;

import com.course_project.arthub_api.dtos.quiz.answer.AnswerResponseDTO;
import com.course_project.arthub_api.entities.Question;

import java.util.List;

public class QuestionResponseDTO {

    private int id;
    private String questionContent;
    private String imageUrl;
    private List<AnswerResponseDTO> answers;

    public QuestionResponseDTO(Question question, List<AnswerResponseDTO> answers) {
        this.id = question.getId();
        this.questionContent = question.getQuestionContent();
        this.imageUrl = question.getImageUrl();
        this.answers = answers;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getQuestionContent() {
        return questionContent;
    }

    public void setQuestionContent(String questionContent) {
        this.questionContent = questionContent;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public List<AnswerResponseDTO> getAnswers() {
        return answers;
    }

    public void setAnswers(List<AnswerResponseDTO> answers) {
        this.answers = answers;
    }
}
