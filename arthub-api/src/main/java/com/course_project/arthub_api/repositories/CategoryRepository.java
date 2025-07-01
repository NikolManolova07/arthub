package com.course_project.arthub_api.repositories;

import com.course_project.arthub_api.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

}
