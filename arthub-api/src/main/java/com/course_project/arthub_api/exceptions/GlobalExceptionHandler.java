package com.course_project.arthub_api.exceptions;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleResourceNotFoundException(ResourceNotFoundException e) {
        // Returns status code 404 for not found with details
        Map<String, Object> jsonResponse = new HashMap<>();
        jsonResponse.put("message", e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(jsonResponse);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Map<String, Object>> handleBadCredentialsException(BadCredentialsException e) {
        // Returns status code 401 for unauthorized access with details
        Map<String, Object> jsonResponse = new HashMap<>();
        jsonResponse.put("message", e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(jsonResponse);
    }

    @ExceptionHandler(InvalidTokenException.class)
    public ResponseEntity<Map<String, Object>> handleInvalidTokenException(InvalidTokenException e) {
        // Returns status code 401 for unauthorized access with details
        Map<String, Object> jsonResponse = new HashMap<>();
        jsonResponse.put("message", e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(jsonResponse);
    }

    @ExceptionHandler(UnauthorizedAccessException.class)
    public ResponseEntity<Map<String, Object>> handleUnauthorizedAccessException(UnauthorizedAccessException e) {
        // Returns status code 403 for forbidden with details
        Map<String, Object> jsonResponse = new HashMap<>();
        jsonResponse.put("message", e.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(jsonResponse);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleIllegalArgumentException(IllegalArgumentException e) {
        // Returns status code 400 for bad request with details
        Map<String, Object> jsonResponse = new HashMap<>();
        jsonResponse.put("message", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(jsonResponse);
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<Map<String, Object>> handleIllegalStateException(IllegalStateException e) {
        // Returns status code 400 for bad request with details
        Map<String, Object> jsonResponse = new HashMap<>();
        jsonResponse.put("message", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(jsonResponse);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, String>> handleDataIntegrityViolation(DataIntegrityViolationException e) {
        // Returns status code 409 for conflict with details
        Map<String, String> jsonResponse = new HashMap<>();
        String response = "Duplicate entry";
        jsonResponse.put("message", response);
        return ResponseEntity.status(HttpStatus.CONFLICT).body(jsonResponse);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        // Returns status code 400 for bad request with details
        List<Map<String, String>> errors = ex.getBindingResult().getFieldErrors().stream()
                .map(error -> Map.of(
                        "field", error.getField(),
                        "rejectedValue", String.valueOf(error.getRejectedValue()),
                        "message", Objects.requireNonNull(error.getDefaultMessage())
                )).toList();

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("errors", errors));
    }
}
