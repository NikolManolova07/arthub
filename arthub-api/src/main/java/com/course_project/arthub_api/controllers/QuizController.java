package com.course_project.arthub_api.controllers;

import com.course_project.arthub_api.dtos.quiz.*;
import com.course_project.arthub_api.dtos.quiz.answer.AnswerCreateRequestDTO;
import com.course_project.arthub_api.dtos.quiz.attempt.QuestionAnswerRequestDTO;
import com.course_project.arthub_api.dtos.quiz.attempt.QuizAttemptStartResponseDTO;
import com.course_project.arthub_api.dtos.quiz.attempt.QuizAttemptSubmitResponseDTO;
import com.course_project.arthub_api.dtos.quiz.creation.QuizCreateRequestDTO;
import com.course_project.arthub_api.dtos.quiz.question.QuestionResponseDTO;
import com.course_project.arthub_api.services.AuthService;
import com.course_project.arthub_api.services.QuizService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class QuizController {

    private final AuthService authService;
    private final QuizService quizService;

    public QuizController(AuthService authService, QuizService quizService) {
        this.authService = authService;
        this.quizService = quizService;
    }

    @PostMapping("/quizzes/")
    public ResponseEntity<QuizBaseResponseDTO> createQuiz(@RequestHeader("Authorization") String token, @RequestBody @Valid QuizCreateRequestDTO quiz) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        QuizBaseResponseDTO response = quizService.createQuiz(loggedInUserId, quiz);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/questions/")
    public ResponseEntity<QuestionResponseDTO> createQuestion(@RequestHeader("Authorization") String token,
                                                              @RequestParam(value = "quizId", required = true) Integer quizId,
                                                              @RequestParam(value = "questionContent", required = true) String questionContent,
                                                              @RequestParam(value = "image", required = false) MultipartFile image) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        QuestionResponseDTO response = quizService.createQuestion(loggedInUserId, quizId, questionContent, image);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/answers/")
    public ResponseEntity<Map<String, String>> createAnswer(@RequestHeader("Authorization") String token, @RequestBody @Valid AnswerCreateRequestDTO answer) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        Map<String, String> response = new HashMap<>();
        response.put("message", quizService.createAnswer(loggedInUserId, answer));
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/quizzes/")
    public ResponseEntity<List<QuizBaseResponseDTO>> getQuizzes(@RequestHeader("Authorization") String token) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        List<QuizBaseResponseDTO> response = quizService.getQuizzes(loggedInUserId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/quizzes/{quizId}")
    public ResponseEntity<QuizDetailsResponseDTO> getQuizById(@RequestHeader("Authorization") String token, @PathVariable int quizId) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        QuizDetailsResponseDTO response = quizService.getQuizById(loggedInUserId, quizId);
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

    @PostMapping("/quizzes/{quizId}/start")
    public ResponseEntity<QuizAttemptStartResponseDTO> startQuiz(@RequestHeader("Authorization") String token, @PathVariable int quizId) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        QuizAttemptStartResponseDTO response = quizService.startQuiz(loggedInUserId, quizId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/quizzes/{quizId}/attempts/{attemptId}/submit")
    public ResponseEntity<QuizAttemptSubmitResponseDTO> submitQuiz(@RequestHeader("Authorization") String token, @PathVariable int quizId, @PathVariable int attemptId, @RequestBody @Valid List<QuestionAnswerRequestDTO> questionAnswerList) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        QuizAttemptSubmitResponseDTO response = quizService.submitQuiz(loggedInUserId, quizId, attemptId, questionAnswerList);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/quizzes/results")
    public ResponseEntity<List<QuizResultsResponseDTO>> getTopQuizResults(@RequestHeader("Authorization") String token) {
        authService.checkAccessToken(token);
        int loggedInUserId = authService.getIdFromToken(token);
        List<QuizResultsResponseDTO> response = quizService.getTopQuizResults(loggedInUserId);
        return ResponseEntity.ok(response);
    }
}
