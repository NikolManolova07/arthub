package com.course_project.arthub_api.dtos.auth;

import jakarta.validation.constraints.NotBlank;

public class UserLoginRequestDTO {

    @NotBlank(message = "Username cannot be blank")
    private String username;

    @NotBlank(message = "Password cannot be blank")
    private String password;

    public UserLoginRequestDTO(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public @NotBlank(message = "Username cannot be blank") String getUsername() {
        return username;
    }

    public void setUsername(@NotBlank(message = "Username cannot be blank") String username) {
        this.username = username;
    }

    public @NotBlank(message = "Password cannot be blank") String getPassword() {
        return password;
    }

    public void setPassword(@NotBlank(message = "Password cannot be blank") String password) {
        this.password = password;
    }
}
