package com.course_project.arthub_api.dtos.auth;

import com.course_project.arthub_api.dtos.user.UserBaseResponseDTO;
import com.course_project.arthub_api.entities.User;

public class UserRegisterResponseDTO extends UserBaseResponseDTO {

    private String message;

    public UserRegisterResponseDTO(User user, String message) {
        super(user);
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
