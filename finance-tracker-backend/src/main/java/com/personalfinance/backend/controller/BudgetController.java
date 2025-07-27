package com.personalfinance.backend.controller;

import java.util.List;
import java.util.Map;

import com.personalfinance.backend.dto.BudgetDto;
import com.personalfinance.backend.service.BudgetService;
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
@RequestMapping("/api/budgets")
public class BudgetController {

  @Autowired
  private BudgetService budgetService;

  @PostMapping
  public ResponseEntity<Map<String, Object>> createBudget(@RequestBody BudgetDto budgetDto) {
    return ResponseEntity.ok(budgetService.createBudget(budgetDto));
  }

  @GetMapping
  public ResponseEntity<List<BudgetDto>> getAllBudgets() {
    return ResponseEntity.ok(budgetService.getAllBudgets());
  }

  @PutMapping("/{id}")
  public ResponseEntity<Map<String, Object>> updateBudget(@PathVariable Long id,  @RequestBody BudgetDto budgetDto) {
    return ResponseEntity.ok(budgetService.updateBudget(id, budgetDto));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Map<String, Object>> deleteBudgets(@PathVariable Long id) {
    return ResponseEntity.ok(budgetService.deleteBudget(id));
  }

  @DeleteMapping("/deleteByCategoryId/{categoryId}")
  public ResponseEntity<Map<String, Object>> deleteBudgetByCategoryId(@PathVariable Long categoryId) {
    return ResponseEntity.ok(budgetService.deleteBudgetByCategoryId(categoryId));
  }
}
