package com.course_project.arthub_api.repositories;

import com.course_project.arthub_api.entities.Reaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReactionRepository extends JpaRepository<Reaction, Integer> {

    int countByPostId(int postId);

    boolean existsByPostIdAndUserId(int postId, int userId);

    void deleteByPostIdAndUserId(int postId, int userId);
}
