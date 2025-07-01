package com.course_project.arthub_api.dtos.user;

import com.course_project.arthub_api.dtos.quiz.creation.QuizCreatedResponseDTO;
import com.course_project.arthub_api.entities.User;

import java.util.List;

public class UserResponseDTO extends UserBaseResponseDTO {

    private int followersCount;
    private int followingCount;
    private int createdQuizzesCount;
    private List<UserBaseResponseDTO> followers;
    private List<UserBaseResponseDTO> following;
    private List<QuizCreatedResponseDTO> createdQuizzes;

    public UserResponseDTO(
            User user,
            int followersCount, int followingCount, int createdQuizzesCount,
            List<UserBaseResponseDTO> followers, List<UserBaseResponseDTO> following,
            List<QuizCreatedResponseDTO> createdQuizzes) {
        super(user);
        this.followersCount = followersCount;
        this.followingCount = followingCount;
        this.createdQuizzesCount = createdQuizzesCount;
        this.followers = followers;
        this.following = following;
        this.createdQuizzes = createdQuizzes;
    }

    public int getFollowersCount() {
        return followersCount;
    }

    public void setFollowersCount(int followersCount) {
        this.followersCount = followersCount;
    }

    public int getFollowingCount() {
        return followingCount;
    }

    public void setFollowingCount(int followingCount) {
        this.followingCount = followingCount;
    }

    public int getCreatedQuizzesCount() {
        return createdQuizzesCount;
    }

    public void setCreatedQuizzesCount(int createdQuizzesCount) {
        this.createdQuizzesCount = createdQuizzesCount;
    }

    public List<UserBaseResponseDTO> getFollowers() {
        return followers;
    }

    public void setFollowers(List<UserBaseResponseDTO> followers) {
        this.followers = followers;
    }

    public List<UserBaseResponseDTO> getFollowing() {
        return following;
    }

    public void setFollowing(List<UserBaseResponseDTO> following) {
        this.following = following;
    }

    public List<QuizCreatedResponseDTO> getCreatedQuizzes() {
        return createdQuizzes;
    }

    public void setCreatedQuizzes(List<QuizCreatedResponseDTO> createdQuizzes) {
        this.createdQuizzes = createdQuizzes;
    }
}
