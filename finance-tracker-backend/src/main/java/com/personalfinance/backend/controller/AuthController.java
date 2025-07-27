package com.personalfinance.backend.controller;

import java.util.HashMap;
import java.util.Map;

import com.personalfinance.backend.dto.JwtAuthResponse;
import com.personalfinance.backend.dto.LoginRequest;
import com.personalfinance.backend.dto.SignUpRequest;
import com.personalfinance.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600, allowCredentials = "true")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired
  private AuthService authService;

  // checking for user authentication and sending the jwt token
  @PostMapping("/login")
  public ResponseEntity<JwtAuthResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
    JwtAuthResponse response = authService.authenticateUser(loginRequest);
    return ResponseEntity.ok(response);
  }

  // signing up a new user and adding them to the database
  @PostMapping("/signup")
  public ResponseEntity<Map<String, String>> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
    return authService.registerUser(signUpRequest);
  }

  // validating the JWT token on refresh or other operations
  @GetMapping("/validate")
  public ResponseEntity<Map<String, Object>> validateToken(@RequestHeader("Authorization") String authHeader) {
    try {
      // Check if the token is null or does not start with "Bearer "
      if(authHeader == null || !authHeader.contains("Bearer ")){
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("error", "Missing or invalid Authorization header");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
      }

      return authService.validateToken(authHeader);
    } catch (Exception ex) {
      Map<String, Object> errorResponse = new HashMap<>();
      errorResponse.put("error", "Token validation failed: " + ex.getMessage());
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
    }
  }
}

