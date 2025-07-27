package com.personalfinance.backend.service;

import com.personalfinance.backend.dto.CategoryExpenseDto;
import com.personalfinance.backend.dto.DashboardSummaryDto;
import com.personalfinance.backend.model.Budget;
import com.personalfinance.backend.model.Category;
import com.personalfinance.backend.model.Expense;
import com.personalfinance.backend.repository.BudgetRepository;
import com.personalfinance.backend.repository.CategoryRepository;
import com.personalfinance.backend.repository.ExpenseRepository;
import com.personalfinance.backend.security.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DashboardService {

  private final BudgetRepository budgetRepository;
  private final ExpenseRepository expenseRepository;
  private final CategoryRepository categoryRepository;

  public DashboardSummaryDto getDashboardSummary() {
    Long userId = SecurityUtils.getCurrentUserId();
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

  public List<CategoryExpenseDto> getCategoryExpenses() {
    Long userId = SecurityUtils.getCurrentUserId();
    List<Expense> expenses = expenseRepository.findByUserId(userId);
    List<Category> categories = categoryRepository.findByUserId(userId);
    List<Budget> budgets = budgetRepository.findByUserId(userId);

    double totalExpenses = expenses.stream().mapToDouble(Expense::getAmount).sum();

    Map<Long, Double> categoryExpenseMap = new HashMap<>();
    for (Expense expense : expenses) {
      categoryExpenseMap.merge(expense.getCategory().getId(), expense.getAmount(), Double::sum);
    }

    List<CategoryExpenseDto> result = new ArrayList<>();
    for (Category category : categories) {
      double amount = categoryExpenseMap.getOrDefault(category.getId(), 0.0);
      double percentage = totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0;
      Budget budget = budgets.stream()
        .filter(b -> b.getCategory().getId().equals(category.getId()))
        .findFirst()
        .orElse(null);

      result.add(new CategoryExpenseDto(
        category.getId(),
        category.getName(),
        amount,
        category.getColor(),
        percentage,
        budget != null ? budget.getLimitAmount() : null,
        budget != null && amount > budget.getLimitAmount()
      ));
    }
    result.sort((a, b) -> Double.compare(b.getAmount(), a.getAmount()));
    return result;
  }

}
