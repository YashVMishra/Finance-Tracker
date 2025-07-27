package com.personalfinance.backend.service;

import com.personalfinance.backend.dto.CategoryDto;
import com.personalfinance.backend.model.Category;
import com.personalfinance.backend.model.User;
import com.personalfinance.backend.repository.CategoryRepository;
import com.personalfinance.backend.repository.UserRepository;
import com.personalfinance.backend.security.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CategoryService {

  @Autowired
  private CategoryRepository categoryRepository;

  @Autowired
  private UserRepository userRepository;

  private Long validateUserAccess() {
    return SecurityUtils.getCurrentUserId();
  }

  public Map<String, Object> createCategory(CategoryDto dto) {
    Long userId = validateUserAccess();

    if(userId == null) {
      return Map.of("error", "Unauthorized: userId is null");
    }

    User user = userRepository.findById(userId)
      .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

    Category category = new Category();
    category.setName(dto.getName());
    category.setColor(dto.getColor());
    category.setUser(user);
    Category saved = categoryRepository.save(category);

    Map<String, Object> response = new HashMap<>();
    response.put("category", mapToDto(saved));
    response.put("message", "Category created successfully");
    return response;
  }

  public List<CategoryDto> getAllCategoriesForUser() {
    Long userId = validateUserAccess();

    if(userId == null) {
      return List.of();
    }

    return categoryRepository.findByUserId(userId)
      .stream()
      .map(this::mapToDto)
      .collect(Collectors.toList());
  }

  public Map<String, Object> updateCategory(Long id, CategoryDto dto) {
    Long userId = validateUserAccess();

    if(userId == null) {
      return Map.of("error", "Unauthorized: userId is null");
    }

    Category category = categoryRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));

    category.setName(dto.getName());
    category.setColor(dto.getColor());
    Category updated = categoryRepository.save(category);

    Map<String, Object> response = new HashMap<>();
    response.put("category", mapToDto(updated));
    response.put("message", "Category updated successfully");
    return response;
  }

  public Map<String, Object> deleteCategory(Long id) {
    Long userId = validateUserAccess();

    if(userId == null) {
      return Map.of("error", "Unauthorized: userId is null");
    }

    Category category = categoryRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
    categoryRepository.delete(category);

    Map<String, Object> response = new HashMap<>();
    response.put("message", "Category deleted successfully");
    return response;
  }

  private CategoryDto mapToDto(Category category) {
    return new CategoryDto(
      category.getId(),
      category.getName(),
      category.getColor()
    );
  }
}