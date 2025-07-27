package com.personalfinance.backend.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseDto {
  private Long id;
  private Double amount;
  private String description;
  private Long categoryId;
  private LocalDate date;
}
