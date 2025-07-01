package com.course_project.arthub_api.services;

import com.course_project.arthub_api.dtos.quiz.*;
import com.course_project.arthub_api.dtos.quiz.answer.AnswerCreateRequestDTO;
import com.course_project.arthub_api.dtos.quiz.answer.AnswerResponseDTO;
import com.course_project.arthub_api.dtos.quiz.attempt.QuestionAnswerRequestDTO;
import com.course_project.arthub_api.dtos.quiz.attempt.QuizAttemptStartResponseDTO;
import com.course_project.arthub_api.dtos.quiz.attempt.QuizAttemptSubmitResponseDTO;
import com.course_project.arthub_api.dtos.quiz.creation.QuizCreateRequestDTO;
import com.course_project.arthub_api.dtos.quiz.question.QuestionResponseDTO;
import com.course_project.arthub_api.dtos.user.UserBaseResponseDTO;
import com.course_project.arthub_api.entities.*;
import com.course_project.arthub_api.exceptions.ResourceNotFoundException;
import com.course_project.arthub_api.exceptions.UnauthorizedAccessException;
import com.course_project.arthub_api.repositories.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class QuizService {

    private final AuthService authService;
    private final AnswerRepository answerRepository;
    private final FollowerRepository followerRepository;
    private final QuestionRepository questionRepository;
    private final QuizRepository quizRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final QuizAttemptAnswerRepository quizAttemptAnswerRepository;
    private final UserRepository userRepository;

    private final ImageStorageService imageStorageService;

    private static final Set<Level> LEVELS = Set.of(Level.EASY, Level.MEDIUM, Level.HARD);

    public QuizService(
            AuthService authService,
            AnswerRepository answerRepository, FollowerRepository followerRepository,
            QuestionRepository questionRepository, QuizRepository quizRepository,
            QuizAttemptRepository quizAttemptRepository, QuizAttemptAnswerRepository quizAttemptAnswerRepository,
            UserRepository userRepository,
            ImageStorageService imageStorageService) {
        this.authService = authService;
        this.answerRepository = answerRepository;
        this.followerRepository = followerRepository;
        this.questionRepository = questionRepository;
        this.quizRepository = quizRepository;
        this.quizAttemptRepository = quizAttemptRepository;
        this.quizAttemptAnswerRepository = quizAttemptAnswerRepository;
        this.userRepository = userRepository;
        this.imageStorageService = imageStorageService;
    }

    // Utility method to check if a quiz is not accessible by the logged-in user.
    public boolean isQuizNotAccessibleByLoggedInUser(int loggedInUserId, int quizId) {
        User user = userRepository.findById(loggedInUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + loggedInUserId));

        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found with id: " + quizId));

        List<User> following = followerRepository.findFollowingByUserId(loggedInUserId);
        following.add(user);

        List<Quiz> quizzes = quizRepository.findByUserInOrderByCreatedAtDesc(following);

        return !quizzes.contains(quiz);
    }

    @Transactional
    public QuizBaseResponseDTO createQuiz(int loggedInUserId, QuizCreateRequestDTO createQuizDTO) {
        User user = userRepository.findById(loggedInUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + loggedInUserId));

        if (!LEVELS.contains(createQuizDTO.getLevel())) {
            throw new IllegalArgumentException("Level must be EASY, MEDIUM or HARD.");
        }

        Quiz quiz = new Quiz();
        quiz.setTitle(createQuizDTO.getTitle());
        quiz.setDescription(createQuizDTO.getDescription());
        quiz.setDuration(createQuizDTO.getDuration());
        quiz.setLevel(createQuizDTO.getLevel());
        quiz.setUser(user);

        quizRepository.save(quiz);

        return new QuizBaseResponseDTO(
                quiz,
                new UserBaseResponseDTO(quiz.getUser()),
                0
        );
    }

    @Transactional
    public QuestionResponseDTO createQuestion(int loggedInUserId, int quizId, String questionContent, MultipartFile image) {
        userRepository.findById(loggedInUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + loggedInUserId));

        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found with id: " + quizId));

        Question question = new Question();
        question.setQuiz(quiz);
        question.setQuestionContent(questionContent);

        // Save image locally and update URL in DB.
        if (image != null && !image.isEmpty()) {
            String imageUrl = imageStorageService.storeImage(image, loggedInUserId);
            question.setImageUrl(imageUrl);
        }

        questionRepository.save(question);

        return new QuestionResponseDTO(
                question,
                null
        );
    }

    @Transactional
    public String createAnswer(int loggedInUserId, AnswerCreateRequestDTO createAnswerDTO) {
        userRepository.findById(loggedInUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + loggedInUserId));

        Question question = questionRepository.findById(createAnswerDTO.getQuestionId())
                .orElseThrow(() -> new ResourceNotFoundException("Question not found with id: " + createAnswerDTO.getQuestionId()));

        Answer answer = new Answer();
        answer.setQuestion(question);
        answer.setAnswerContent(createAnswerDTO.getAnswerContent());
        answer.setCorrect(createAnswerDTO.getCorrect());

        answerRepository.save(answer);

        return "Answer created successfully";
    }

    public List<QuizBaseResponseDTO> getQuizzes(int loggedInUserId) {
        User user = userRepository.findById(loggedInUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + loggedInUserId));

        // Fetch the users that the logged-in user follows and include the logged-in user in the list as well.
        List<User> following = followerRepository.findFollowingByUserId(loggedInUserId);
        following.add(user);

        List<Quiz> quizzes = quizRepository.findByUserInOrderByCreatedAtDesc(following);

        return quizzes
                .stream()
                .map(q -> {
                    int questionsCount = questionRepository.countByQuizId(q.getId());

                    return new QuizBaseResponseDTO(
                            q,
                            new UserBaseResponseDTO(q.getUser()),
                            questionsCount);
                }).toList();
    }

    public QuizDetailsResponseDTO getQuizById(int loggedInUserId, int quizId) {
        if (isQuizNotAccessibleByLoggedInUser(loggedInUserId, quizId)) {
            throw new UnauthorizedAccessException("A logged-in user can only see quizzes made by themselves or by users they follow");
        }

        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found with id: " + quizId));

        int questionsCount = questionRepository.countByQuizId(quizId);

        List<QuestionResponseDTO> questionsCollection = questionRepository.findByQuizId(quizId)
                .stream()
                .map(q -> {
                    List<AnswerResponseDTO> answersCollection = answerRepository.findByQuestionId(q.getId())
                            .stream()
                            .map(AnswerResponseDTO::new)
                            .toList();
                    return new QuestionResponseDTO(q, answersCollection);
                }).toList();

        return new QuizDetailsResponseDTO(
                quiz,
                new UserBaseResponseDTO(quiz.getUser()),
                questionsCount,
                questionsCollection
        );
    }

    // Quiz creators and the admin can delete their own quizzes.
    @Transactional
    public String deleteQuiz(int loggedInUserId, int quizId) {
        User user = userRepository.findById(loggedInUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + loggedInUserId));

        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found with id: " + quizId));

        if (!quiz.getUser().equals(user) && authService.getRoleById(loggedInUserId) != Role.ADMIN) {
            throw new UnauthorizedAccessException("Only the logged-in user or the admin is allowed to delete their own quizzes");
        }

        quizRepository.delete(quiz);

        return "Quiz deleted successfully";
    }

    @Transactional
    public QuizAttemptStartResponseDTO startQuiz(int loggedInUserId, int quizId) {
        if (isQuizNotAccessibleByLoggedInUser(loggedInUserId, quizId)) {
            throw new UnauthorizedAccessException("A logged-in user can only see quizzes made by themselves or by users they follow");
        }

        User user = userRepository.findById(loggedInUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + loggedInUserId));

        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found with id: " + quizId));

        QuizAttempt attempt = new QuizAttempt();
        attempt.setUser(user);
        attempt.setQuiz(quiz);

        quizAttemptRepository.save(attempt);

        QuizDetailsResponseDTO quizDetails = getQuizById(loggedInUserId, attempt.getQuiz().getId());

        return new QuizAttemptStartResponseDTO(
                attempt,
                quizDetails,
                new UserBaseResponseDTO(attempt.getUser())
        );
    }

    @Transactional
    public QuizAttemptSubmitResponseDTO submitQuiz(int loggedInUserId, int quizId, int attemptId, List<QuestionAnswerRequestDTO> questionAnswerListDTO) {
        User user = userRepository.findById(loggedInUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + loggedInUserId));

        quizRepository.findById(quizId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found with id: " + quizId));

        QuizAttempt attempt = quizAttemptRepository.findByIdAndStatus(attemptId, Status.IN_PROGRESS)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz attempt not found or already submitted"));

        if (!attempt.getUser().equals(user)) {
            throw new UnauthorizedAccessException("User with id: " + loggedInUserId + " cannot continue an attempt of another user");
        }

        if (questionAnswerListDTO == null || questionAnswerListDTO.isEmpty()) {
            throw new IllegalArgumentException("List of question answers for attempt with id: " + attemptId + " cannot be null or empty");
        }

        int questionsCount = questionRepository.countByQuizId(attempt.getQuiz().getId());
        if (questionAnswerListDTO.size() != questionsCount) {
            throw new IllegalArgumentException("Number of question answers for attempt with id: " + attemptId + " must be " + questionsCount);
        }

        int totalScore = 0;

        for (QuestionAnswerRequestDTO questionAnswer : questionAnswerListDTO) {
            Question question = questionRepository.findById(questionAnswer.getQuestionId())
                    .orElseThrow(() -> new ResourceNotFoundException("Question not found with id: " + questionAnswer.getQuestionId()));

            Answer answer = answerRepository.findById(questionAnswer.getAnswerId())
                    .orElseThrow(() -> new ResourceNotFoundException("Question not found with id: " + questionAnswer.getAnswerId()));

            boolean isCorrect = answer.isCorrect();
            if (isCorrect) {
                totalScore += 1;
            }

            QuizAttemptAnswer attemptAnswer = new QuizAttemptAnswer();
            attemptAnswer.setQuizAttempt(attempt);
            attemptAnswer.setQuestion(question);
            attemptAnswer.setAnswer(answer);
            attemptAnswer.setCorrect(isCorrect);

            quizAttemptAnswerRepository.save(attemptAnswer);
        }

        attempt.setScore(totalScore);
        attempt.setEndTime(LocalDateTime.now());
        attempt.setStatus(Status.COMPLETED);

        quizAttemptRepository.save(attempt);

        QuizDetailsResponseDTO quizDetails = getQuizById(loggedInUserId, attempt.getQuiz().getId());

        return new QuizAttemptSubmitResponseDTO(
                attempt,
                quizDetails,
                new UserBaseResponseDTO(attempt.getUser())
        );
    }

    public List<QuizResultsResponseDTO> getTopQuizResults(int loggedInUserId) {
        userRepository.findById(loggedInUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + loggedInUserId));

        List<Object[]> results = quizAttemptRepository.findUserBestScoresByQuiz();

        Map<Object, List<UserBestScoreDTO>> groupedResults = new HashMap<>();

        // Iterate over the results to map and group manually.
        for (Object[] result : results) {
            Integer quizId = (Integer) result[0]; // quizId
            Integer userId = (Integer) result[1]; // userId
            LocalDateTime startTime = ((Timestamp) result[2]).toLocalDateTime(); // startTime
            LocalDateTime endTime = ((Timestamp) result[3]).toLocalDateTime(); // endTime
            Integer bestScore = (Integer) result[4]; // bestScore

            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

            UserBestScoreDTO userBestScore = new UserBestScoreDTO(
                    new UserBaseResponseDTO(user),
                    startTime,
                    endTime,
                    bestScore
            );

            if (!groupedResults.containsKey(quizId)) {
                groupedResults.put(quizId, new ArrayList<>());
            }

            groupedResults.get(quizId).add(userBestScore);
        }

        List<QuizResultsResponseDTO> quizResults = new ArrayList<>();

        for (Map.Entry<Object, List<UserBestScoreDTO>> entry : groupedResults.entrySet()) {
            Integer quizId = (Integer) entry.getKey();
            List<UserBestScoreDTO> topUsers = entry.getValue();

            String quizName = quizRepository.findById(quizId).map(Quiz::getTitle).orElse("Unknown quiz");

            QuizResultsResponseDTO quizResult = new QuizResultsResponseDTO(quizId, quizName, topUsers);
            quizResults.add(quizResult);
        }

        return quizResults;
    }

    // Admin can view a list of all quizzes in the system.
    public List<QuizBaseResponseDTO> getQuizzesByAdmin(int loggedInUserId) {
        userRepository.findById(loggedInUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + loggedInUserId));

        if (authService.getRoleById(loggedInUserId) != Role.ADMIN) {
            throw new UnauthorizedAccessException("Only the admin can view a list of all quizzes");
        }

        List<Quiz> quizzes = quizRepository.findAll();

        return quizzes
                .stream()
                .map(q -> {
                    int questionsCount = questionRepository.countByQuizId(q.getId());

                    return new QuizBaseResponseDTO(
                            q,
                            new UserBaseResponseDTO(q.getUser()),
                            questionsCount);
                }).toList();
    }
}
