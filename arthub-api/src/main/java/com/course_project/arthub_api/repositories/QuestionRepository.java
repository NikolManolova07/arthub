package com.course_project.arthub_api.repositories;

import com.course_project.arthub_api.entities.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Integer> {

    int countByQuizId(int quizId);

    List<Question> findByQuizId(int quizId);
}
