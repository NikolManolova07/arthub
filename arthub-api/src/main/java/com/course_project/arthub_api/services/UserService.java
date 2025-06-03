package com.course_project.arthub_api.services;

import com.course_project.arthub_api.dtos.quiz.creation.QuizCreatedResponseDTO;
import com.course_project.arthub_api.dtos.user.LeaderboardResponseDTO;
import com.course_project.arthub_api.dtos.user.UserBaseResponseDTO;
import com.course_project.arthub_api.dtos.user.UserResponseDTO;
import com.course_project.arthub_api.entities.*;
import com.course_project.arthub_api.exceptions.ResourceNotFoundException;
import com.course_project.arthub_api.exceptions.UnauthorizedAccessException;
import com.course_project.arthub_api.repositories.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.function.Consumer;

@Service
public class UserService {

    private final AuthService authService;
    private final FollowerRepository followerRepository;
    private final QuestionRepository questionRepository;
    private final QuizRepository quizRepository;
    private final UserRepository userRepository;

    private final ImageStorageService imageStorageService;

    public UserService(AuthService authService,
                       FollowerRepository followerRepository, QuestionRepository questionRepository,
                       QuizRepository quizRepository, UserRepository userRepository, ImageStorageService imageStorageService) {
        this.authService = authService;
        this.followerRepository = followerRepository;
        this.questionRepository = questionRepository;
        this.quizRepository = quizRepository;
        this.userRepository = userRepository;
        this.imageStorageService = imageStorageService;
    }

    // Utility method to update user fields conditionally.
    public void updateFieldIfNotNull(String value, Consumer<String> setter) {
        Optional.ofNullable(value).ifPresent(setter);
    }

    public UserResponseDTO getUserById(int loggedInUserId, int userId) {
        userRepository.findById(loggedInUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + loggedInUserId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        List<User> followers = followerRepository.findFollowersByUserId(userId);
        List<User> following = followerRepository.findFollowingByUserId(userId);
        List<Quiz> createdQuizzes = quizRepository.findByUserId(userId);

        int followersCount = followers.size();
        int followingCount = following.size();
        int createdQuizzesCount = createdQuizzes.size();

        List<UserBaseResponseDTO> followersCollection = followers.stream()
                .map(UserBaseResponseDTO::new)
                .toList();

        List<UserBaseResponseDTO> followingCollection = following.stream()
                .map(UserBaseResponseDTO::new)
                .toList();

        List<QuizCreatedResponseDTO> createdQuizzesCollection = createdQuizzes.stream()
                .map(q -> {
                    int questionsCount = questionRepository.countByQuizId(q.getId());
                    return new QuizCreatedResponseDTO(q, questionsCount);
                }).toList();

        return new UserResponseDTO(
                user, followersCount, followingCount, createdQuizzesCount,
                followersCollection, followingCollection, createdQuizzesCollection
        );
    }

    @Transactional
    public UserBaseResponseDTO updateUser(int loggedInUserId, int userId, String firstName, String lastName, String email, MultipartFile image) {
        User loggedInUser = userRepository.findById(loggedInUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + loggedInUserId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        if (!loggedInUser.equals(user)) {
            throw new UnauthorizedAccessException("Only the logged-in user can update their own data");
        }

        updateFieldIfNotNull(firstName, user::setFirstName);
        updateFieldIfNotNull(lastName, user::setLastName);
        updateFieldIfNotNull(email, user::setEmail);

        // Save image locally and update URL in DB.
        if (image != null && !image.isEmpty()) {
            String imageUrl = imageStorageService.storeImage(image, userId);
            user.setImageUrl(imageUrl);
        }

        userRepository.save(user);

        return new UserBaseResponseDTO(user);
    }

    @Transactional
    public String followUser(int followerId, int followedId) {
        User loggedInUser = userRepository.findById(followerId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + followerId));

        User user = userRepository.findById(followedId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + followedId));

        if (loggedInUser.equals(user)) {
            throw new UnauthorizedAccessException("User cannot follow themselves");
        }

        boolean existsFollowership = followerRepository.existsByFollowerIdAndFollowedId(followerId, followedId);

        if (existsFollowership) {
            throw new IllegalStateException("User with id: " + followerId + " already follows a user with id: " + followedId);
        }

        Follower followership = new Follower();
        followership.setFollower(loggedInUser);
        followership.setFollowed(user);

        followerRepository.save(followership);

        return "Successful followership";
    }

    @Transactional
    public String unfollowUser(int followerId, int followedId) {
        User loggedInUser = userRepository.findById(followerId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + followerId));

        User user = userRepository.findById(followedId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + followedId));

        if (loggedInUser.equals(user)) {
            throw new UnauthorizedAccessException("User cannot unfollow themselves");
        }

        boolean existsFollowership = followerRepository.existsByFollowerIdAndFollowedId(followerId, followedId);

        if (!existsFollowership) {
            throw new IllegalStateException("User with id: " + followerId + " cannot unfollow a user with id: " + followedId + " since they are not currently following them");
        }

        followerRepository.deleteByFollowerIdAndFollowedId(followerId, followedId);

        return "Successful unfollowing";
    }

    public List<UserBaseResponseDTO> getFollowersByUserId(int loggedInUserId, int userId) {
        userRepository.findById(loggedInUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + loggedInUserId));

        userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        List<User> followers = followerRepository.findFollowersByUserId(userId);

        return followers.stream()
                .map(UserBaseResponseDTO::new)
                .toList();
    }

    public List<UserBaseResponseDTO> getFollowingByUserId(int loggedInUserId, int userId) {
        userRepository.findById(loggedInUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + loggedInUserId));

        userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        List<User> following = followerRepository.findFollowingByUserId(userId);

        return following.stream()
                .map(UserBaseResponseDTO::new)
                .toList();
    }

    public List<LeaderboardResponseDTO> getLeaderboard(int loggedInUserId) {
        userRepository.findById(loggedInUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + loggedInUserId));

        List<Object[]> results = userRepository.getLeaderboard();

        return results.stream()
                .map(r -> new LeaderboardResponseDTO(
                                new UserBaseResponseDTO((User) r[0]), // user
                                (Long) r[1] // totalScore
                        )
                ).toList();
    }

    public List<UserBaseResponseDTO> searchUsers(int loggedInUserId, String keyword) {
        userRepository.findById(loggedInUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + loggedInUserId));

        if (keyword == null || keyword.trim().isEmpty()) {
            throw new IllegalArgumentException("Keyword cannot be null or empty");
        }

        List<User> users = userRepository.searchUsersByKeyword(keyword);

        return users.stream()
                .filter(u -> u.getId() != loggedInUserId)
                .map(UserBaseResponseDTO::new)
                .toList();
    }

    // Admin can view a list of all users in the system.
    public List<UserBaseResponseDTO> getUsers(int loggedInUserId) {
        if (authService.getRoleById(loggedInUserId) != Role.ADMIN) {
            throw new UnauthorizedAccessException("Only the admin can view a list of all users");
        }

        List<User> users = userRepository.findAll();

        return users.stream()
                .map(UserBaseResponseDTO::new)
                .toList();
    }

    // Admin can delete users.
    @Transactional
    public String deleteUser(int loggedInUserId, int userId) {
        if (authService.getRoleById(loggedInUserId) != Role.ADMIN) {
            throw new UnauthorizedAccessException("Only the admin can delete users");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        if (loggedInUserId == userId) {
            throw new UnauthorizedAccessException("The user cannot delete their profile by themselves");
        }

        userRepository.delete(user);

        return "User deleted successfully";
    }

    // Admin can promote users.
    @Transactional
    public String promoteUser(int loggedInUserId, int userId) {
        if (authService.getRoleById(loggedInUserId) != Role.ADMIN) {
            throw new UnauthorizedAccessException("Only the admin can promote users");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        if (loggedInUserId == userId) {
            throw new UnauthorizedAccessException("The user cannot promote themselves to an admin role");
        }

        if (authService.getRoleById(userId) == Role.ADMIN) {
            throw new UnauthorizedAccessException("The user already has an admin role");
        }

        user.setRole(Role.ADMIN);
        userRepository.save(user);

        return "Admin role promoted successfully";
    }
}
