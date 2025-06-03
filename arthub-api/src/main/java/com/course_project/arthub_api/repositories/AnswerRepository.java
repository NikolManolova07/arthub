package com.course_project.arthub_api.repositories;

import com.course_project.arthub_api.entities.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Integer> {

    List<Answer> findByQuestionId(int questionId);
}
