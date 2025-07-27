package com.personalfinance.backend.controller;

import java.util.List;
import java.util.Map;

import com.personalfinance.backend.dto.CategoryDto;
import com.personalfinance.backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

  @Autowired
  private CategoryService categoryService;

  @PostMapping
  public ResponseEntity<Map<String, Object>> createCategory(@RequestBody CategoryDto categoryDto) {
    return ResponseEntity.ok(categoryService.createCategory(categoryDto));
  }

  @GetMapping
  public ResponseEntity<List<CategoryDto>> getAllCategory() {
    List<CategoryDto> categories = categoryService.getAllCategoriesForUser();
    return ResponseEntity.ok(categories);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Map<String, Object>> updateCategory(@PathVariable Long id, @RequestBody CategoryDto categoryDto) {
    return ResponseEntity.ok(categoryService.updateCategory(id, categoryDto));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Map<String, Object>> deleteCategory(@PathVariable Long id) {
    return ResponseEntity.ok(categoryService.deleteCategory(id));
  }
}
