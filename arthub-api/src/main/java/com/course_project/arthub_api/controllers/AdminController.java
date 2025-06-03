package com.course_project.arthub_api.controllers;

import com.course_project.arthub_api.dtos.category.CategoryCreateRequestDTO;
import com.course_project.arthub_api.dtos.category.CategoryResponseDTO;
import com.course_project.arthub_api.dtos.post.PostBaseResponseDTO;
import com.course_project.arthub_api.dtos.quiz.QuizBaseResponseDTO;
import com.course_project.arthub_api.dtos.user.UserBaseResponseDTO;
import com.course_project.arthub_api.services.*;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AuthService authService;
    private final CategoryService categoryService;
    private final PostService postService;
    private final QuizService quizService;
    private final UserService userService;

    public AdminController(AuthService authService, CategoryService categoryService, PostService postService, QuizService quizService, UserService userService) {
        this.authService = authService;
        this.categoryService = categoryService;
        this.postService = postService;
        this.quizService = quizService;
        this.userService = userService;
    }

    // Users Management.
    @GetMapping("/users/")
    public ResponseEntity<List<UserBaseResponseDTO>> getUsers(@RequestHeader("Authorization") String token) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        List<UserBaseResponseDTO> response = userService.getUsers(loggedInUserId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<Map<String, String>> deleteUser(@RequestHeader("Authorization") String token, @PathVariable int userId) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        Map<String, String> response = new HashMap<>();
        response.put("message", userService.deleteUser(loggedInUserId, userId));
        return ResponseEntity.ok(response);
    }

    @PutMapping("/users/{userId}/promote")
    public ResponseEntity<Map<String, String>> promoteUser(@RequestHeader("Authorization") String token, @PathVariable int userId) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        Map<String, String> response = new HashMap<>();
        response.put("message", userService.promoteUser(loggedInUserId, userId));
        return ResponseEntity.ok(response);
    }

    // Posts Management.
    @GetMapping("/posts/")
    public ResponseEntity<List<PostBaseResponseDTO>> getPosts(@RequestHeader("Authorization") String token) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        List<PostBaseResponseDTO> response = postService.getPostsByAdmin(loggedInUserId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/posts/{postId}")
    public ResponseEntity<Map<String, String>> deletePost(@RequestHeader("Authorization") String token, @PathVariable int postId) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        Map<String, String> response = new HashMap<>();
        response.put("message", postService.deletePost(loggedInUserId, postId));
        return ResponseEntity.ok(response);
    }

    // Quizzes Management.
    @GetMapping("/quizzes/")
    public ResponseEntity<List<QuizBaseResponseDTO>> getQuizzes(@RequestHeader("Authorization") String token) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        List<QuizBaseResponseDTO> response = quizService.getQuizzesByAdmin(loggedInUserId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/quizzes/{quizId}")
    public ResponseEntity<Map<String, String>> deleteQuiz(@RequestHeader("Authorization") String token, @PathVariable int quizId) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        Map<String, String> response = new HashMap<>();
        response.put("message", quizService.deleteQuiz(loggedInUserId, quizId));
        return ResponseEntity.ok(response);
    }

    // Categories Management.
    @PostMapping("/categories/")
    public ResponseEntity<CategoryResponseDTO> createCategory(@RequestHeader("Authorization") String token, @RequestBody @Valid CategoryCreateRequestDTO category) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        CategoryResponseDTO response = categoryService.createCategory(loggedInUserId, category);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/categories/{categoryId}")
    public ResponseEntity<Map<String, String>> deleteCategory(@RequestHeader("Authorization") String token, @PathVariable int categoryId) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        Map<String, String> response = new HashMap<>();
        response.put("message", categoryService.deleteCategory(loggedInUserId, categoryId));
        return ResponseEntity.ok(response);
    }
}
