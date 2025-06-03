package com.course_project.arthub_api.dtos.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UserRegisterRequestDTO {

    @NotBlank(message = "Username cannot be blank")
    private String username;

    @NotBlank(message = "Firstname cannot be blank")
    private String firstName;

    @NotBlank(message = "Lastname cannot be blank")
    private String lastName;

    @NotBlank(message = "Email cannot be blank")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Password cannot be blank")
    @Size(min = 3, message = "Password must be at least 3 characters long")
    private String password;

    public UserRegisterRequestDTO(String username, String firstName, String lastName, String email, String password) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    public @NotBlank(message = "Username cannot be blank") String getUsername() {
        return username;
    }

    public void setUsername(@NotBlank(message = "Username cannot be blank") String username) {
        this.username = username;
    }

    public @NotBlank(message = "Firstname cannot be blank") String getFirstName() {
        return firstName;
    }

    public void setFirstName(@NotBlank(message = "Firstname cannot be blank") String firstName) {
        this.firstName = firstName;
    }

    public @NotBlank(message = "Lastname cannot be blank") String getLastName() {
        return lastName;
    }

    public void setLastName(@NotBlank(message = "Lastname cannot be blank") String lastName) {
        this.lastName = lastName;
    }

    public @NotBlank(message = "Email cannot be blank") @Email(message = "Email should be valid") String getEmail() {
        return email;
    }

    public void setEmail(@NotBlank(message = "Email cannot be blank") @Email(message = "Email should be valid") String email) {
        this.email = email;
    }

    public @NotBlank(message = "Password cannot be blank") String getPassword() {
        return password;
    }

    public void setPassword(@NotBlank(message = "Password cannot be blank") String password) {
        this.password = password;
    }
}
