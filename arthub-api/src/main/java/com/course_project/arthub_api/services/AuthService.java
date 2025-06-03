package com.course_project.arthub_api.services;

import com.course_project.arthub_api.dtos.auth.*;
import com.course_project.arthub_api.dtos.user.UserBaseResponseDTO;
import com.course_project.arthub_api.entities.Role;
import com.course_project.arthub_api.entities.User;
import com.course_project.arthub_api.exceptions.BadCredentialsException;
import com.course_project.arthub_api.exceptions.InvalidTokenException;
import com.course_project.arthub_api.exceptions.ResourceNotFoundException;
import com.course_project.arthub_api.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final Map<String, Integer> tokenStore = new HashMap<>();

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserBaseResponseDTO getUserById(int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        return new UserBaseResponseDTO(user);
    }

    public Role getRoleById(int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        return user.getRole();
    }

    // Get the ID of the logged-in user from the token.
    public int getIdFromToken(String token) {
        return tokenStore.get(token);
    }

    // Check if the provided access token is valid.
    public void checkAccessToken(String token) {
        boolean isValid = tokenStore.containsKey(token);

        if (!isValid) {
            throw new InvalidTokenException("Invalid token");
        }
    }

    @Transactional
    public UserRegisterResponseDTO registerUser(UserRegisterRequestDTO registerUserDTO) {
        User user = new User();

        user.setUsername(registerUserDTO.getUsername());
        user.setFirstName(registerUserDTO.getFirstName());
        user.setLastName(registerUserDTO.getLastName());
        user.setEmail(registerUserDTO.getEmail());
        user.setPassword(registerUserDTO.getPassword());
        user.setRole(Role.USER);

        userRepository.save(user);

        return new UserRegisterResponseDTO(user, "Successful registration");
    }

    public UserLoginResponseDTO loginUser(UserLoginRequestDTO loginUserDTO) {
        String username = loginUserDTO.getUsername();
        String password = loginUserDTO.getPassword();

        User user = userRepository.findByUsernameAndPassword(username, password)
                .orElseThrow(() -> new BadCredentialsException("Incorrect username or password"));

        // Generate a custom token for the user.
        String token = UUID.randomUUID().toString();
        tokenStore.put(token, user.getId());

        return new UserLoginResponseDTO(user, "Successful login", token);
    }

    public String logoutUser(String token) {
        tokenStore.remove(token);

        return "Successful logout";
    }
}
