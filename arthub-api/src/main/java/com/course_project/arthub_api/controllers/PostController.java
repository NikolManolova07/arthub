package com.course_project.arthub_api.controllers;

import com.course_project.arthub_api.dtos.comment.CommentCreateRequestDTO;
import com.course_project.arthub_api.dtos.comment.CommentResponseDTO;
import com.course_project.arthub_api.dtos.post.PostDetailsResponseDTO;
import com.course_project.arthub_api.services.AuthService;
import com.course_project.arthub_api.services.PostService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final AuthService authService;
    private final PostService postService;

    public PostController(AuthService authService, PostService postService) {
        this.authService = authService;
        this.postService = postService;
    }

    @PostMapping("/")
    public ResponseEntity<PostDetailsResponseDTO> createPost(@RequestHeader("Authorization") String token,
                                                             @RequestParam(value = "categoryId", required = true) Integer categoryId,
                                                             @RequestParam(value = "postContent", required = true) String postContent,
                                                             @RequestParam(value = "image", required = false) MultipartFile image) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        PostDetailsResponseDTO response = postService.createPost(loggedInUserId, categoryId, postContent, image);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/")
    public ResponseEntity<List<PostDetailsResponseDTO>> getPosts(@RequestHeader("Authorization") String token) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        List<PostDetailsResponseDTO> response = postService.getPosts(loggedInUserId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<PostDetailsResponseDTO> getPostById(@RequestHeader("Authorization") String token, @PathVariable int postId) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        PostDetailsResponseDTO response = postService.getPostById(loggedInUserId, postId);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<Map<String, String>> deletePost(@RequestHeader("Authorization") String token, @PathVariable int postId) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        Map<String, String> response = new HashMap<>();
        response.put("message", postService.deletePost(loggedInUserId, postId));
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{postId}/like")
    public ResponseEntity<Map<String, String>> likePost(@RequestHeader("Authorization") String token, @PathVariable int postId) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        Map<String, String> response = new HashMap<>();
        response.put("message", postService.likePost(loggedInUserId, postId));
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{postId}/unlike")
    public ResponseEntity<Map<String, String>> unlikePost(@RequestHeader("Authorization") String token, @PathVariable int postId) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        Map<String, String> response = new HashMap<>();
        response.put("message", postService.unlikePost(loggedInUserId, postId));
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{postId}/comments/")
    public ResponseEntity<CommentResponseDTO> commentPost(@RequestHeader("Authorization") String token, @PathVariable int postId, @RequestBody @Valid CommentCreateRequestDTO comment) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        CommentResponseDTO response = postService.commentPost(loggedInUserId, postId, comment);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{postId}/comments/{commentId}")
    public ResponseEntity<Map<String, String>> deleteComment(@RequestHeader("Authorization") String token, @PathVariable int postId, @PathVariable int commentId) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        Map<String, String> response = new HashMap<>();
        response.put("message", postService.deleteComment(loggedInUserId, postId, commentId));
        return ResponseEntity.ok(response);
    }

    @GetMapping("/categories/{categoryId}")
    public ResponseEntity<List<PostDetailsResponseDTO>> getPostsByCategory(@RequestHeader("Authorization") String token, @PathVariable int categoryId) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        List<PostDetailsResponseDTO> response = postService.getPostsByCategory(loggedInUserId, categoryId);
        return ResponseEntity.ok(response);
    }
}
