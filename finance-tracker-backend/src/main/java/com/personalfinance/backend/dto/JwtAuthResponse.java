package com.personalfinance.backend.dto;

public class JwtAuthResponse {
  private String accessToken;
  private String tokenType = "Bearer";
  private UserDto user; // To include user details in the login response as per frontend

  public JwtAuthResponse(String accessToken, UserDto user) {
    this.accessToken = accessToken;
    this.user = user;
  }

  // Getters and Setters
  public String getAccessToken() {
    return accessToken;
  }

  public void setAccessToken(String accessToken) {
    this.accessToken = accessToken;
  }

  public String getTokenType() {
    return tokenType;
  }

  public void setTokenType(String tokenType) {
    this.tokenType = tokenType;
  }

  public UserDto getUser() {
    return user;
  }

  public void setUser(UserDto user) {
    this.user = user;
  }
}

