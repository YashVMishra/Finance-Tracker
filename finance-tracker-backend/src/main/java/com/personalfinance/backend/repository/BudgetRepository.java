package com.personalfinance.backend.repository;

import java.util.List;

import com.personalfinance.backend.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {
  List<Budget> findByUserId(Long userId);
  Budget findByCategoryId(Long categoryId);
}
