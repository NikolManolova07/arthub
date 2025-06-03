package com.course_project.arthub_api.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class ImageStorageService {

    private static final String UPLOAD_DIR = "uploads/";

    public String storeImage(MultipartFile file, int id) {
        try {
            // Create directory if not exists.
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Generate unique filename.
            String filename = "file" + id + "_" + System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(filename);

            // Save file.
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            return "/uploads/" + filename; // Relative path stored in DB.
        } catch (IOException e) {
            throw new RuntimeException("Failed to store image file", e);
        }
    }
}
