package com.personalfinance.backend.controller;

import com.personalfinance.backend.dto.ExpenseDto;
import com.personalfinance.backend.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

  @Autowired
  private ExpenseService expenseService;

  @PostMapping
  public ResponseEntity<Map<String, Object>> createExpense(@RequestBody ExpenseDto dto) {
    return ResponseEntity.ok(expenseService.createExpense(dto));
  }

  @GetMapping
  public List<ExpenseDto> getAllExpensesForUser() {
    return expenseService.getAllExpensesForUser();
  }

  @PutMapping("/{id}")
  public ResponseEntity<Map<String, Object>> updateExpense(@PathVariable Long id, @RequestBody ExpenseDto dto) {
    return ResponseEntity.ok(expenseService.updateExpense(id, dto));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Map<String, Object>> deleteExpense(@PathVariable Long id) {
    return ResponseEntity.ok(expenseService.deleteExpense(id));
  }

  @DeleteMapping("/deleteByCategoryId/{categoryId}")
  public ResponseEntity<Map<String, Object>> deleteExpenseByCategoryId(@PathVariable Long categoryId) {
    return ResponseEntity.ok(expenseService.deleteExpenseByCategoryId(categoryId));
  }
}