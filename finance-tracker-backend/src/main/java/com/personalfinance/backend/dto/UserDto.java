package com.personalfinance.backend.dto;

import lombok.Getter;
import lombok.Setter;

// This DTO is used to send user information to the client,
// matching the structure expected by the frontend's AuthProvider.
@Setter
@Getter
public class UserDto {
  private Long id;
  private String name;
  private String email;

  public UserDto(Long id, String name, String email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

