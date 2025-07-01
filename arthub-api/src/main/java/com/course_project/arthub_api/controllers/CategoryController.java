package com.course_project.arthub_api.controllers;

import com.course_project.arthub_api.dtos.category.CategoryResponseDTO;
import com.course_project.arthub_api.services.AuthService;
import com.course_project.arthub_api.services.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final AuthService authService;
    private final CategoryService categoryService;

    public CategoryController(AuthService authService, CategoryService categoryService) {
        this.authService = authService;
        this.categoryService = categoryService;
    }

    @GetMapping("/")
    public ResponseEntity<List<CategoryResponseDTO>> getCategories(@RequestHeader("Authorization") String token) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        List<CategoryResponseDTO> response = categoryService.getCategories(loggedInUserId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<CategoryResponseDTO> getCategoryById(@RequestHeader("Authorization") String token, @PathVariable int categoryId) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        CategoryResponseDTO response = categoryService.getCategoryById(loggedInUserId, categoryId);
        return ResponseEntity.ok(response);
    }
}
