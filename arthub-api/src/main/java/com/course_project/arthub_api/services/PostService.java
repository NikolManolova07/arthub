package com.course_project.arthub_api.services;

import com.course_project.arthub_api.dtos.category.CategoryResponseDTO;
import com.course_project.arthub_api.dtos.comment.CommentCreateRequestDTO;
import com.course_project.arthub_api.dtos.comment.CommentResponseDTO;
import com.course_project.arthub_api.dtos.post.PostBaseResponseDTO;
import com.course_project.arthub_api.dtos.post.PostDetailsResponseDTO;
import com.course_project.arthub_api.dtos.user.UserBaseResponseDTO;
import com.course_project.arthub_api.entities.*;
import com.course_project.arthub_api.exceptions.ResourceNotFoundException;
import com.course_project.arthub_api.exceptions.UnauthorizedAccessException;
import com.course_project.arthub_api.repositories.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class PostService {

    private final AuthService authService;
    private final CategoryRepository categoryRepository;
    private final CommentRepository commentRepository;
    private final FollowerRepository followerRepository;
    private final PostRepository postRepository;
    private final ReactionRepository reactionRepository;
    private final UserRepository userRepository;

    private final ImageStorageService imageStorageService;

    public PostService(
            AuthService authService,
            CategoryRepository categoryRepository, CommentRepository commentRepository,
            FollowerRepository followerRepository, PostRepository postRepository,
            ReactionRepository reactionRepository, UserRepository userRepository,
            ImageStorageService imageStorageService) {
        this.authService = authService;
        this.categoryRepository = categoryRepository;
        this.commentRepository = commentRepository;
        this.followerRepository = followerRepository;
        this.postRepository = postRepository;
        this.reactionRepository = reactionRepository;
        this.userRepository = userRepository;
        this.imageStorageService = imageStorageService;
    }

    // Utility method to check if a post is not accessible by the logged-in user.
    public boolean isPostNotAccessibleByLoggedInUser(int loggedInUserId, int postId) {
        User user = userRepository.findById(loggedInUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + loggedInUserId));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));

        List<User> following = followerRepository.findFollowingByUserId(loggedInUserId);
        following.add(user);

        List<Post> posts = postRepository.findByUserInOrderByCreatedAtDesc(following);

        return !posts.contains(post);
    }

    @Transactional
    public PostDetailsResponseDTO createPost(int loggedInUserId, int categoryId, String postContent, MultipartFile image) {
        User user = userRepository.findById(loggedInUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + loggedInUserId));

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + categoryId));

        Post post = new Post();
        post.setUser(user);
        post.setCategory(category);
        post.setPostContent(postContent);

        // Save image locally and update URL in DB.
        if (image != null && !image.isEmpty()) {
            String imageUrl = imageStorageService.storeImage(image, loggedInUserId);
            post.setImageUrl(imageUrl);
        }

        postRepository.save(post);

        return new PostDetailsResponseDTO(
                post,
                new UserBaseResponseDTO(post.getUser()),
                new CategoryResponseDTO(post.getCategory()),
                false,
                0,
                0,
                null
        );
    }

    public List<PostDetailsResponseDTO> getPosts(int loggedInUserId) {
        User user = userRepository.findById(loggedInUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + loggedInUserId));

        // Fetch the users that the logged-in user follows and include the logged-in user in the list as well.
        List<User> following = followerRepository.findFollowingByUserId(loggedInUserId);
        following.add(user);

        List<Post> posts = postRepository.findByUserInOrderByCreatedAtDesc(following);

        return posts
                .stream()
                .map(p -> {
                    boolean existsReaction = reactionRepository.existsByPostIdAndUserId(p.getId(), loggedInUserId);
                    int likesCount = reactionRepository.countByPostId(p.getId());
                    int commentsCount = commentRepository.countByPostId(p.getId());

                    List<CommentResponseDTO> commentsCollection = commentRepository.findByPostIdOrderByCreatedAtAsc(p.getId())
                            .stream()
                            .map(c ->
                                    new CommentResponseDTO(new UserBaseResponseDTO(c.getUser()), c)).toList();

                    return new PostDetailsResponseDTO(
                            p,
                            new UserBaseResponseDTO(p.getUser()),
                            new CategoryResponseDTO(p.getCategory()),
                            existsReaction,
                            likesCount,
                            commentsCount,
                            commentsCollection);
                }).toList();
    }

    public PostDetailsResponseDTO getPostById(int loggedInUserId, int postId) {
        if (isPostNotAccessibleByLoggedInUser(loggedInUserId, postId)) {
            throw new UnauthorizedAccessException("A logged-in user can only see posts made by themselves or by users they follow");
        }

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));

        boolean existsReaction = reactionRepository.existsByPostIdAndUserId(postId, loggedInUserId);
        int likesCount = reactionRepository.countByPostId(postId);
        int commentsCount = commentRepository.countByPostId(postId);

        List<CommentResponseDTO> commentsCollection = commentRepository.findByPostIdOrderByCreatedAtAsc(postId)
                .stream()
                .map(c -> new CommentResponseDTO(new UserBaseResponseDTO(c.getUser()), c)).toList();

        return new PostDetailsResponseDTO(
                post,
                new UserBaseResponseDTO(post.getUser()),
                new CategoryResponseDTO(post.getCategory()),
                existsReaction,
                likesCount,
                commentsCount,
                commentsCollection
        );
    }

    // Post creators and the admin can delete their own posts.
    @Transactional
    public String deletePost(int loggedInUserId, int postId) {
        User user = userRepository.findById(loggedInUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + loggedInUserId));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));

        if (!post.getUser().equals(user) && authService.getRoleById(loggedInUserId) != Role.ADMIN) {
            throw new UnauthorizedAccessException("Only the logged-in user or the admin is allowed to delete their own posts");
        }

        postRepository.delete(post);

        return "Post deleted successfully";
    }

    @Transactional
    public String likePost(int loggedInUserId, int postId) {
        if (isPostNotAccessibleByLoggedInUser(loggedInUserId, postId)) {
            throw new UnauthorizedAccessException("A logged-in user can only react to posts made by themselves or by users they follow");
        }

        User user = userRepository.findById(loggedInUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + loggedInUserId));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));

        boolean existsReaction = reactionRepository.existsByPostIdAndUserId(postId, loggedInUserId);

        if (existsReaction) {
            throw new IllegalStateException("User with id: " + loggedInUserId + " already likes a post with id: " + postId);
        }

        Reaction reaction = new Reaction();
        reaction.setPost(post);
        reaction.setUser(user);
        reaction.setReactionType(ReactionType.LIKE);

        reactionRepository.save(reaction);

        return "Successful like";
    }

    @Transactional
    public String unlikePost(int loggedInUserId, int postId) {
        if (isPostNotAccessibleByLoggedInUser(loggedInUserId, postId)) {
            throw new UnauthorizedAccessException("A logged-in user can only react to posts made by themselves or by users they follow");
        }

        boolean existsReaction = reactionRepository.existsByPostIdAndUserId(postId, loggedInUserId);

        if (!existsReaction) {
            throw new IllegalStateException("User with id: " + loggedInUserId + " cannot unlike a post with id: " + postId + " because they have not liked it yet");
        }

        reactionRepository.deleteByPostIdAndUserId(postId, loggedInUserId);

        return "Successful unlike";
    }

    @Transactional
    public CommentResponseDTO commentPost(int loggedInUserId, int postId, CommentCreateRequestDTO createCommentDTO) {
        if (isPostNotAccessibleByLoggedInUser(loggedInUserId, postId)) {
            throw new UnauthorizedAccessException("A logged-in user can only react to posts made by themselves or by users they follow");
        }

        User user = userRepository.findById(loggedInUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + loggedInUserId));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));

        Comment comment = new Comment();
        comment.setPost(post);
        comment.setUser(user);
        comment.setComment(createCommentDTO.getComment());

        commentRepository.save(comment);

        return new CommentResponseDTO(
                new UserBaseResponseDTO(comment.getUser()),
                comment
        );
    }

    // Post creators can delete comments on their posts and users can delete their own comments.
    @Transactional
    public String deleteComment(int loggedInUserId, int postId, int commentId) {
        if (isPostNotAccessibleByLoggedInUser(loggedInUserId, postId)) {
            throw new UnauthorizedAccessException("A logged-in user can only react to posts made by themselves or by users they follow");
        }

        User user = userRepository.findById(loggedInUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + loggedInUserId));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + postId));

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found with id: " + commentId));

        if (!post.getUser().equals(user) && !comment.getUser().equals(user)) {
            throw new UnauthorizedAccessException("The user is not allowed to delete this comment");
        }

        commentRepository.delete(comment);

        return "Comment deleted successfully";
    }

    // Filter posts by category.
    public List<PostDetailsResponseDTO> getPostsByCategory(int loggedInUserId, int categoryId) {
        List<PostDetailsResponseDTO> posts = getPosts(loggedInUserId);

        categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + categoryId));

        return posts
                .stream()
                .filter(c -> c.getCategory().getId() == categoryId)
                .toList();
    }

    // Admin can view a list of all posts in the system.
    public List<PostBaseResponseDTO> getPostsByAdmin(int loggedInUserId) {
        userRepository.findById(loggedInUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + loggedInUserId));

        if (authService.getRoleById(loggedInUserId) != Role.ADMIN) {
            throw new UnauthorizedAccessException("Only the admin can view a list of all posts");
        }

        List<Post> posts = postRepository.findAll();

        return posts
                .stream()
                .map(p -> {
                    int likesCount = reactionRepository.countByPostId(p.getId());
                    int commentsCount = commentRepository.countByPostId(p.getId());

                    return new PostBaseResponseDTO(
                            p,
                            new UserBaseResponseDTO(p.getUser()),
                            new CategoryResponseDTO(p.getCategory()),
                            likesCount,
                            commentsCount
                    );
                }).toList();
    }
}
