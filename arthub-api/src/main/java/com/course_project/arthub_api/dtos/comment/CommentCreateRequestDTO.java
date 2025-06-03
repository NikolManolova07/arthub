package com.course_project.arthub_api.dtos.comment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CommentCreateRequestDTO {

    @NotBlank(message = "Comment cannot be blank")
    @Size(min = 1, message = "Comment must have at least 1 character")
    private String comment;

    public CommentCreateRequestDTO(String comment) {
        this.comment = comment;
    }

    public @NotBlank(message = "Comment cannot be blank") @Size(min = 1, message = "Comment must have at least 1 character") String getComment() {
        return comment;
    }

    public void setComment(@NotBlank(message = "Comment cannot be blank") @Size(min = 1, message = "Comment must have at least 1 character") String comment) {
        this.comment = comment;
    }
}
