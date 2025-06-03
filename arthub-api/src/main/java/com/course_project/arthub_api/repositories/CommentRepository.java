package com.course_project.arthub_api.repositories;

import com.course_project.arthub_api.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

    int countByPostId(int postId);

    List<Comment> findByPostIdOrderByCreatedAtAsc(int postId);
}
