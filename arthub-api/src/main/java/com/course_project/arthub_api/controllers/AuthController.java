package com.course_project.arthub_api.controllers;

import com.course_project.arthub_api.dtos.auth.*;
import com.course_project.arthub_api.dtos.user.UserBaseResponseDTO;
import com.course_project.arthub_api.services.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserRegisterResponseDTO> registerUser(@RequestBody @Valid UserRegisterRequestDTO user) {
        UserRegisterResponseDTO response = authService.registerUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<UserLoginResponseDTO> loginUser(@RequestBody @Valid UserLoginRequestDTO user) {
        UserLoginResponseDTO response = authService.loginUser(user);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logoutUser(@RequestHeader("Authorization") String token) {
        authService.checkAccessToken(token);
        Map<String, String> response = new HashMap<>();
        response.put("message", authService.logoutUser(token));
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<UserBaseResponseDTO> getUser(@RequestHeader("Authorization") String token) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        UserBaseResponseDTO response = authService.getUserById(loggedInUserId);
        return ResponseEntity.ok(response);
    }
}
