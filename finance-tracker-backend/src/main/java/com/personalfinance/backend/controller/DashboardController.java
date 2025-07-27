package com.personalfinance.backend.controller;

import java.util.List;

import com.personalfinance.backend.dto.CategoryExpenseDto;
import com.personalfinance.backend.dto.DashboardSummaryDto;
import com.personalfinance.backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

  private final DashboardService dashboardService;

  @GetMapping("/summary")
  public DashboardSummaryDto getDashboardSummary() {
    return dashboardService.getDashboardSummary();
  }

  @GetMapping("/category-expenses")
  public List<CategoryExpenseDto> getCategoryExpenses() {
    return dashboardService.getCategoryExpenses();
  }
}
