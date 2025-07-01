package com.course_project.arthub_api.services;

import com.course_project.arthub_api.dtos.category.CategoryCreateRequestDTO;
import com.course_project.arthub_api.dtos.category.CategoryResponseDTO;
import com.course_project.arthub_api.entities.Category;
import com.course_project.arthub_api.entities.Role;
import com.course_project.arthub_api.exceptions.ResourceNotFoundException;
import com.course_project.arthub_api.exceptions.UnauthorizedAccessException;
import com.course_project.arthub_api.repositories.CategoryRepository;
import com.course_project.arthub_api.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final AuthService authService;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public CategoryService(AuthService authService, CategoryRepository categoryRepository, UserRepository userRepository) {
        this.authService = authService;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    public List<CategoryResponseDTO> getCategories(int loggedInUserId) {
        userRepository.findById(loggedInUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + loggedInUserId));

        List<Category> categories = categoryRepository.findAll();

        return categories.stream()
                .map(CategoryResponseDTO::new)
                .toList();
    }

    public CategoryResponseDTO getCategoryById(int loggedInUserId, int categoryId) {
        userRepository.findById(loggedInUserId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + loggedInUserId));

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + categoryId));

        return new CategoryResponseDTO(category);
    }

    // Admin can create categories.
    @Transactional
    public CategoryResponseDTO createCategory(int loggedInUserId, CategoryCreateRequestDTO createCategoryDTO) {
        if (authService.getRoleById(loggedInUserId) != Role.ADMIN) {
            throw new UnauthorizedAccessException("Only the admin can create new categories");
        }

        Category category = new Category();
        category.setName(createCategoryDTO.getName());
        category.setDescription(createCategoryDTO.getDescription());

        categoryRepository.save(category);

        return new CategoryResponseDTO(category);
    }

    // Admin can delete categories.
    @Transactional
    public String deleteCategory(int loggedInUserId, int categoryId) {
        if (authService.getRoleById(loggedInUserId) != Role.ADMIN) {
            throw new UnauthorizedAccessException("Only the admin can delete categories");
        }

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + categoryId));

        categoryRepository.delete(category);

        return "Category deleted successfully";
    }
}
