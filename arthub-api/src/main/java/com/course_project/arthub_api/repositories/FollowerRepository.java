package com.course_project.arthub_api.repositories;

import com.course_project.arthub_api.entities.Follower;
import com.course_project.arthub_api.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FollowerRepository extends JpaRepository<Follower, Integer> {

    @Query("SELECT f.follower FROM Follower f JOIN User u ON f.follower.id = u.id " +
            "WHERE f.followed.id = :userId")
    List<User> findFollowersByUserId(@Param("userId") int userId);

    @Query("SELECT f.followed FROM Follower f JOIN User u ON f.followed.id = u.id " +
            "WHERE f.follower.id = :userId")
    List<User> findFollowingByUserId(@Param("userId") int userId);

    boolean existsByFollowerIdAndFollowedId(int followerId, int followedId);

    void deleteByFollowerIdAndFollowedId(int followerId, int followedId);
}
