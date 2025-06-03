package com.course_project.arthub_api.repositories;

import com.course_project.arthub_api.entities.QuizAttempt;
import com.course_project.arthub_api.entities.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Integer> {

    Optional<QuizAttempt> findByIdAndStatus(int id, Status status);

    /* We pick only the best attempt per user per quiz which is based on:
    - Highest score;
    - If scores are equal, we pick the shortest time taken.

    We partition (group logically) by quiz_id and user_id:
    - Sort by score DESC (best score first);
    - If tie: sort by duration ASC (shortest time first);
    - ROW_NUMBER() gives each row in the group a number (1 = best).

    Then we filter out only the best attempt for each pair — only the row where rn = 1 is kept.
    */
    @Query(value = """
            SELECT 
                quiz_id AS quizId,
                user_id AS userId,
                start_time AS startTime,
                end_time AS endTime,
                score AS bestScore,
                DATEDIFF('SECOND', start_time, end_time) AS durationInSeconds
            FROM (
                SELECT qa.*, 
                       ROW_NUMBER() OVER (
                           PARTITION BY quiz_id, user_id 
                           ORDER BY score DESC, DATEDIFF('SECOND', start_time, end_time) ASC
                       ) AS rn
                FROM quiz_attempts qa
            ) AS ranked
            WHERE ranked.rn = 1
            ORDER BY quiz_id, bestScore DESC, durationInSeconds ASC
            """, nativeQuery = true)
    List<Object[]> findUserBestScoresByQuiz();
}
