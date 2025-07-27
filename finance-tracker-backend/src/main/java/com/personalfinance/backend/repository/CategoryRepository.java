package com.personalfinance.backend.repository;

import java.util.List;

import com.personalfinance.backend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
  public List<Category> findByUserId(Long userId);
  public Category findByName(String name);
}
