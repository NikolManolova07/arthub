package com.course_project.arthub_api.dtos.category;

import jakarta.validation.constraints.NotBlank;

public class CategoryCreateRequestDTO {

    @NotBlank(message = "Name cannot be blank")
    private String name;

    private String description;

    public CategoryCreateRequestDTO(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public @NotBlank(message = "Name cannot be blank") String getName() {
        return name;
    }

    public void setName(@NotBlank(message = "Name cannot be blank") String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
