package com.course_project.arthub_api.repositories;

import com.course_project.arthub_api.entities.QuizAttemptAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizAttemptAnswerRepository extends JpaRepository<QuizAttemptAnswer, Integer> {

}
