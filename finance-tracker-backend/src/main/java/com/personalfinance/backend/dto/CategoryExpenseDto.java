// src/main/java/com/personalfinance/backend/dto/CategoryExpenseDto.java
package com.personalfinance.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryExpenseDto {
  private Long id;
  private String name;
  private double amount;
  private String color;
  private double percentage;
  private Double budgetLimit;
  private boolean isOverBudget;
}
