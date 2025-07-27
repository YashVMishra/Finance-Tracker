// src/main/java/com/personalfinance/backend/service/ExpenseService.java
package com.personalfinance.backend.service;

import com.personalfinance.backend.dto.ExpenseDto;
import com.personalfinance.backend.model.*;
import com.personalfinance.backend.repository.*;
import com.personalfinance.backend.security.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ExpenseService {

  @Autowired
  private ExpenseRepository expenseRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private CategoryRepository categoryRepository;

  private Long validateUserAccess() {
    return SecurityUtils.getCurrentUserId();
  }

  public Map<String, Object> createExpense(ExpenseDto dto) {
    Long userId = validateUserAccess();

    if(userId == null) {
      return Map.of("error", "Unauthorized: userId is null");
    }

    User user = userRepository.findById(userId).orElseThrow();
    Category category = categoryRepository.findById(dto.getCategoryId()).orElseThrow();

    Expense expense = new Expense();
    expense.setUser(user);
    expense.setCategory(category);
    expense.setAmount(dto.getAmount());
    expense.setDescription(dto.getDescription());
    expense.setDate(dto.getDate());

    Expense saved = expenseRepository.save(expense);
    return Map.of("Expense", mapToDto(saved), "message", "Expense created successfully");
  }

  public List<ExpenseDto> getAllExpensesForUser() {
    Long userId = validateUserAccess();

    if(userId == null) {
      return List.of();
    }

    return expenseRepository.findByUserId(userId)
      .stream()
      .map(this::mapToDto)
      .collect(Collectors.toList());
  }

  public Map<String, Object> updateExpense(Long id, ExpenseDto dto) {
    Long userId = validateUserAccess();

    if(userId == null) {
      return Map.of("error", "Unauthorized: userId is null");
    }

    Expense expense = expenseRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
    Category category = categoryRepository.findById(dto.getCategoryId()).orElseThrow(() -> new RuntimeException("Category not found with id: " + dto.getCategoryId()));

    expense.setCategory(category);
    expense.setAmount(dto.getAmount());
    expense.setDescription(dto.getDescription());
    expense.setDate(dto.getDate());
    Expense updated = expenseRepository.save(expense);
    return Map.of(
      "expense", mapToDto(updated),
      "message", "Expense updated successfully"
    );
  }

  public Map<String, Object> deleteExpense(Long id) {
    Long userId = validateUserAccess();

    if(userId == null) {
      return Map.of("error", "Unauthorized: userId is null");
    }

    Expense expense = expenseRepository.findById(id).orElseThrow();
    expenseRepository.delete(expense);

    return Map.of("message", "Expense deleted successfully");
  }

  // utility method to map Expense to ExpenseDto
  private ExpenseDto mapToDto(Expense expense) {
    return new ExpenseDto(
      expense.getId(),
      expense.getAmount(),
      expense.getDescription(),
      expense.getCategory().getId(),
      expense.getDate()
    );
  }

  public Map<String, Object> deleteExpenseByCategoryId(Long categoryId) {
    Long userId = validateUserAccess();

    if(userId == null) {
      return Map.of("error", "Unauthorized: userId is null");
    }

    List<Expense> expenses = expenseRepository.findByCategoryId(categoryId);
    if (expenses.isEmpty()) {
      return Map.of("message", "No expenses found for this category");
    }

    expenseRepository.deleteAll(expenses);
    return Map.of("message", "Expenses deleted successfully");
  }
}