package com.course_project.arthub_api.dtos.post;

import com.course_project.arthub_api.dtos.category.CategoryResponseDTO;
import com.course_project.arthub_api.dtos.user.UserBaseResponseDTO;
import com.course_project.arthub_api.entities.Post;

import java.time.LocalDateTime;

public class PostBaseResponseDTO {

    private int id;
    private UserBaseResponseDTO createdBy;
    private CategoryResponseDTO category;
    private LocalDateTime createdAt;
    private int likesCount;
    private int commentsCount;

    public PostBaseResponseDTO(Post post, UserBaseResponseDTO user, CategoryResponseDTO category, int likesCount, int commentsCount) {
        this.id = post.getId();
        this.createdBy = user;
        this.category = category;
        this.createdAt = post.getCreatedAt();
        this.likesCount = likesCount;
        this.commentsCount = commentsCount;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
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
}
