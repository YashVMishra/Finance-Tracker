// src/main/java/com/personalfinance/backend/repository/ExpenseRepository.java
package com.personalfinance.backend.repository;

import com.personalfinance.backend.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
  List<Expense> findByUserId(Long userId);
  List<Expense> findByCategoryId(Long categoryId);
}
