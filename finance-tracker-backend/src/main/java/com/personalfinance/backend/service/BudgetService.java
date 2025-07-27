package com.personalfinance.backend.service;

import com.personalfinance.backend.dto.BudgetDto;
import com.personalfinance.backend.dto.DashboardSummaryDto;
import com.personalfinance.backend.model.Budget;
import com.personalfinance.backend.model.Category;
import com.personalfinance.backend.model.Expense;
import com.personalfinance.backend.model.User;
import com.personalfinance.backend.repository.BudgetRepository;
import com.personalfinance.backend.repository.CategoryRepository;
import com.personalfinance.backend.repository.ExpenseRepository;
import com.personalfinance.backend.repository.UserRepository;
import com.personalfinance.backend.security.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.YearMonth;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class BudgetService {

  @Autowired
  private BudgetRepository budgetRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private CategoryRepository categoryRepository;

  private Long validateUserAccess() {
    Long currentUserId = SecurityUtils.getCurrentUserId();
    if (currentUserId == null) {
      throw new RuntimeException("Unauthorized: Security context does not contain a valid user ID");
    }

    return currentUserId;
  }

  public Map<String, Object> createBudget(BudgetDto budgetDto) {
    Long userId = validateUserAccess();

    User user = userRepository.findById(userId)
      .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

    Category category = categoryRepository.findById(budgetDto.getCategoryId())
      .orElseThrow(() -> new RuntimeException("Category not found with id: " + budgetDto.getCategoryId()));

    Budget budget = new Budget(user, category, budgetDto.getLimitAmount());
    budgetRepository.save(budget);

    return Map.of("budget", mapToDto(budget),
      "message", "Budget created successfully");
  }

  public List<BudgetDto> getAllBudgets() {
    Long userId = validateUserAccess();

    return budgetRepository.findByUserId(userId).stream()
      .map(this::mapToDto)
      .collect(Collectors.toList());
  }

  public Map<String, Object> updateBudget(Long id, BudgetDto budgetDto) {
    Long userId = validateUserAccess();

    Budget budget = budgetRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("Budget not found with id: " + id));

    budget.setLimitAmount(budgetDto.getLimitAmount());
    Budget updatedBudget = budgetRepository.save(budget);

    return Map.of("budget", mapToDto(updatedBudget),
      "message", "Budget updated successfully");
  }

  public Map<String, Object> deleteBudget(Long id) {
    Long userId = validateUserAccess();

    Budget budget = budgetRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("Budget not found with id: " + id));

    budgetRepository.delete(budget);

    return Map.of("message", "Budget deleted successfully");
  }

  private BudgetDto mapToDto(Budget budget) {
    BudgetDto dto = new BudgetDto();
    dto.setId(budget.getId());
    dto.setCategoryId(budget.getCategory().getId());
    dto.setLimitAmount(budget.getLimitAmount());
    return dto;
  }

  public Map<String, Object> deleteBudgetByCategoryId(Long categoryId) {
    Long userId = validateUserAccess();

    Budget budget = budgetRepository.findByCategoryId(categoryId);

    budgetRepository.delete(budget);
    return Map.of("message", "Budget deleted successfully for category id: " + categoryId);
  }

  @Service
  @RequiredArgsConstructor
  public static class DashboardService {

    private final BudgetRepository budgetRepository;
    private final ExpenseRepository expenseRepository;

    public DashboardSummaryDto getDashboardSummary(Long userId) {
      List<Budget> budgets = budgetRepository.findByUserId(userId);
      List<Expense> expenses = expenseRepository.findByUserId(userId);

      double totalBudget = budgets.stream().mapToDouble(Budget::getLimitAmount).sum();
      double totalExpenses = expenses.stream().mapToDouble(Expense::getAmount).sum();
      double remainingBudget = totalBudget - totalExpenses;

      YearMonth thisMonth = YearMonth.now();
      YearMonth lastMonth = thisMonth.minusMonths(1);

      double thisMonthExpenses = expenses.stream()
        .filter(e -> YearMonth.from(e.getDate()).equals(thisMonth))
        .mapToDouble(Expense::getAmount)
        .sum();

      double lastMonthExpenses = expenses.stream()
        .filter(e -> YearMonth.from(e.getDate()).equals(lastMonth))
        .mapToDouble(Expense::getAmount)
        .sum();

      double expenseChange = lastMonthExpenses > 0
        ? ((thisMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100
        : 0;

      return new DashboardSummaryDto(
        totalBudget,
        totalExpenses,
        remainingBudget,
        thisMonthExpenses,
        lastMonthExpenses,
        expenseChange
      );
    }
  }
}