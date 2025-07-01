package com.course_project.arthub_api.repositories;

import com.course_project.arthub_api.entities.Quiz;
import com.course_project.arthub_api.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizRepository extends JpaRepository<Quiz, Integer> {

    List<Quiz> findByUserInOrderByCreatedAtDesc(List<User> users);

    List<Quiz> findByUserId(int userId);
}
