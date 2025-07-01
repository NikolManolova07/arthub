package com.course_project.arthub_api.repositories;

import com.course_project.arthub_api.entities.Post;
import com.course_project.arthub_api.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Integer> {

    List<Post> findByUserInOrderByCreatedAtDesc(List<User> users);
}
