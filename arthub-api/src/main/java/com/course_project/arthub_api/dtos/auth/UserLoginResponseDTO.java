package com.course_project.arthub_api.dtos.auth;

import com.course_project.arthub_api.dtos.user.UserBaseResponseDTO;
import com.course_project.arthub_api.entities.User;

public class UserLoginResponseDTO extends UserBaseResponseDTO {

    private String message;
    private String token;

    public UserLoginResponseDTO(User user, String message, String token) {
        super(user);
        this.message = message;
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
