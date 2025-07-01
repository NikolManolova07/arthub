package com.course_project.arthub_api.dtos.post;

import com.course_project.arthub_api.dtos.category.CategoryResponseDTO;
import com.course_project.arthub_api.dtos.comment.CommentResponseDTO;
import com.course_project.arthub_api.dtos.user.UserBaseResponseDTO;
import com.course_project.arthub_api.entities.Post;

import java.time.LocalDateTime;
import java.util.List;

public class PostDetailsResponseDTO {

    private int id;
    private UserBaseResponseDTO createdBy;
    private CategoryResponseDTO category;
    private String postContent;
    private String imageUrl;
    private LocalDateTime createdAt;
    private boolean isLikedByLoggedInUser;
    private int likesCount;
    private int commentsCount;
    private List<CommentResponseDTO> comments;

    public PostDetailsResponseDTO(Post post, UserBaseResponseDTO user, CategoryResponseDTO category, boolean isLikedByLoggedInUser, int likesCount, int commentsCount, List<CommentResponseDTO> comments) {
        this.id = post.getId();
        this.createdBy = user;
        this.category = category;
        this.postContent = post.getPostContent();
        this.imageUrl = post.getImageUrl();
        this.createdAt = post.getCreatedAt();
        this.isLikedByLoggedInUser = isLikedByLoggedInUser;
        this.likesCount = likesCount;
        this.commentsCount = commentsCount;
        this.comments = comments;
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

    public CategoryResponseDTO getCategory() {
        return category;
    }

    public void setCategory(CategoryResponseDTO category) {
        this.category = category;
    }

    public String getPostContent() {
        return postContent;
    }

    public void setPostContent(String postContent) {
        this.postContent = postContent;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public boolean isLikedByLoggedInUser() {
        return isLikedByLoggedInUser;
    }

    public void setLikedByLoggedInUser(boolean likedByLoggedInUser) {
        isLikedByLoggedInUser = likedByLoggedInUser;
    }

    public int getLikesCount() {
        return likesCount;
    }

    public void setLikesCount(int likesCount) {
        this.likesCount = likesCount;
    }

    public int getCommentsCount() {
        return commentsCount;
    }

    public void setCommentsCount(int commentsCount) {
        this.commentsCount = commentsCount;
    }

    public List<CommentResponseDTO> getComments() {
        return comments;
    }

    public void setComments(List<CommentResponseDTO> comments) {
        this.comments = comments;
    }
}
