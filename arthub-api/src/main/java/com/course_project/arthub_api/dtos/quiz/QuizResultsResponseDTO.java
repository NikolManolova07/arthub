package com.course_project.arthub_api.dtos.quiz;

import java.util.List;

public class QuizResultsResponseDTO {

    private int quizId;
    private String quizName;
    private List<UserBestScoreDTO> topUsers;

    public QuizResultsResponseDTO(int quizId, String quizName, List<UserBestScoreDTO> topUsers) {
        this.quizId = quizId;
        this.quizName = quizName;
        this.topUsers = topUsers;
    }

    public int getQuizId() {
        return quizId;
    }

    public void setQuizId(int quizId) {
        this.quizId = quizId;
    }

    public String getQuizName() {
        return quizName;
    }

    public void setQuizName(String quizName) {
        this.quizName = quizName;
    }

    public List<UserBestScoreDTO> getTopUsers() {
        return topUsers;
    }

    public void setTopUsers(List<UserBestScoreDTO> topUsers) {
        this.topUsers = topUsers;
    }
}
