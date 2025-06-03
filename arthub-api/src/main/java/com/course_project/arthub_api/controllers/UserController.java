package com.course_project.arthub_api.controllers;

import com.course_project.arthub_api.dtos.user.LeaderboardResponseDTO;
import com.course_project.arthub_api.dtos.user.UserBaseResponseDTO;
import com.course_project.arthub_api.dtos.user.UserResponseDTO;
import com.course_project.arthub_api.services.AuthService;
import com.course_project.arthub_api.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final AuthService authService;
    private final UserService userService;

    public UserController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserResponseDTO> getUser(@RequestHeader("Authorization") String token, @PathVariable int userId) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        UserResponseDTO response = userService.getUserById(loggedInUserId, userId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserBaseResponseDTO> updateUser(@RequestHeader("Authorization") String token, @PathVariable int userId,
                                                          @RequestParam(value = "firstName", required = false) String firstName,
                                                          @RequestParam(value = "lastName", required = false) String lastName,
                                                          @RequestParam(value = "email", required = false) String email,
                                                          @RequestParam(value = "image", required = false) MultipartFile image) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        UserBaseResponseDTO response = userService.updateUser(loggedInUserId, userId, firstName, lastName, email, image);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{userId}/follow")
    public ResponseEntity<Map<String, String>> followUser(@RequestHeader("Authorization") String token, @PathVariable int userId) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        Map<String, String> response = new HashMap<>();
        response.put("message", userService.followUser(loggedInUserId, userId));
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{userId}/unfollow")
    public ResponseEntity<Map<String, String>> unfollowUser(@RequestHeader("Authorization") String token, @PathVariable int userId) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        Map<String, String> response = new HashMap<>();
        response.put("message", userService.unfollowUser(loggedInUserId, userId));
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}/followers")
    public ResponseEntity<List<UserBaseResponseDTO>> getUserFollowers(@RequestHeader("Authorization") String token, @PathVariable int userId) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        List<UserBaseResponseDTO> response = userService.getFollowersByUserId(loggedInUserId, userId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}/following")
    public ResponseEntity<List<UserBaseResponseDTO>> getUserFollowing(@RequestHeader("Authorization") String token, @PathVariable int userId) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        List<UserBaseResponseDTO> response = userService.getFollowingByUserId(loggedInUserId, userId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/leaderboard")
    public ResponseEntity<List<LeaderboardResponseDTO>> getLeaderboard(@RequestHeader("Authorization") String token) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        List<LeaderboardResponseDTO> response = userService.getLeaderboard(loggedInUserId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    public ResponseEntity<List<UserBaseResponseDTO>> searchUsers(@RequestHeader("Authorization") String token, @RequestParam String keyword) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        List<UserBaseResponseDTO> response = userService.searchUsers(loggedInUserId, keyword);
        return ResponseEntity.ok((response));
    }
}
