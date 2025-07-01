package com.course_project.arthub_api.repositories;

import com.course_project.arthub_api.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUsernameAndPassword(String username, String password);

    @Query("SELECT u FROM User u WHERE " +
            "(LOWER(u.username) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            " LOWER(u.firstName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            " LOWER(u.lastName) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<User> searchUsersByKeyword(@Param("keyword") String keyword);

    /* We need to:
    - Select each user and the sum of their highest scores per quiz;
    - Only include the highest score per quiz per user in the sum;
    - Group by username and order users by total sum of their best scores in descending order.

    We assume QuizAttempt has a unique id, and we pick one of the highest-scoring attempts per user per quiz using a subquery on both score and id:
    - MAX(innerQa.score): Gets the highest score for this user on this quiz;
    - MIN(subQa.id): Among tied top-score attempts, pick the one with the smallest id (can change to MAX or another field if needed).
    */
    @Query("""
                SELECT u, SUM(qa.score) 
                FROM User u 
                JOIN QuizAttempt qa ON u.id = qa.user.id 
                WHERE qa.id = (
                         SELECT MIN(subQa.id)
                         FROM QuizAttempt subQa
                         WHERE subQa.user.id = u.id
                           AND subQa.quiz.id = qa.quiz.id
                           AND subQa.score = (
                               SELECT MAX(innerQa.score)
                               FROM QuizAttempt innerQa
                               WHERE innerQa.user.id = u.id
                                 AND innerQa.quiz.id = qa.quiz.id
                           )
                     )
                GROUP BY u.username
                ORDER BY SUM(qa.score) DESC
            """)
    List<Object[]> getLeaderboard();
}
