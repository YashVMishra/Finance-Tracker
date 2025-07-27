package com.personalfinance.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardSummaryDto {
  private double totalBudget;
  private double totalExpenses;
  private double remainingBudget;
  private double thisMonthExpenses;
  private double lastMonthExpenses;
  private double expenseChange;
}