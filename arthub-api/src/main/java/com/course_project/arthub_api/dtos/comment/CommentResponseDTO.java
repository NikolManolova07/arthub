package com.course_project.arthub_api.dtos.comment;

import com.course_project.arthub_api.dtos.user.UserBaseResponseDTO;
import com.course_project.arthub_api.entities.Comment;

import java.time.LocalDateTime;

public class CommentResponseDTO {

    private int id;
    private UserBaseResponseDTO createdBy;
    private String comment;
    private LocalDateTime createdAt;

    public CommentResponseDTO(UserBaseResponseDTO user, Comment comment) {
        this.id = comment.getId();
        this.createdBy = user;
        this.comment = comment.getComment();
        this.createdAt = comment.getCreatedAt();
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

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
