package com.personalfinance.backend.service;

import java.util.HashMap;
import java.util.Map;

import com.personalfinance.backend.dto.JwtAuthResponse;
import com.personalfinance.backend.dto.LoginRequest;
import com.personalfinance.backend.dto.SignUpRequest;
import com.personalfinance.backend.dto.UserDto;
import com.personalfinance.backend.model.User;
import com.personalfinance.backend.repository.UserRepository;
import com.personalfinance.backend.security.CustomUserDetails;
import com.personalfinance.backend.security.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private JwtTokenProvider tokenProvider;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private JwtTokenProvider jwtTokenProvider;

  // authenticating the user and sending the jwt token
  public JwtAuthResponse authenticateUser(LoginRequest loginRequest){

    // What happens internally:
    // Calls CustomUserDetailsService.loadUserByUsername(email)
    // Fetches user from DB
    // Compares hashed password using PasswordEncoder
    // If wrong → exception
    // If correct → returns Authentication
    Authentication authentication = authenticationManager.authenticate(
      new UsernamePasswordAuthenticationToken(
        loginRequest.getEmail(),
        loginRequest.getPassword()
      )
    );

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = tokenProvider.generateToken(authentication);

    CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
    UserDto userDto = new UserDto(userDetails.getId(), userDetails.getName(), userDetails.getUsername());

    return new JwtAuthResponse(jwt, userDto);
  }

  // registering the user
  public ResponseEntity<Map<String, String>> registerUser(SignUpRequest signUpRequest) {
    if (Boolean.TRUE.equals(userRepository.existsByEmail(signUpRequest.getEmail()))) {
      Map<String, String> errorResponse = new HashMap<>();
      errorResponse.put("error", "Email is already in use!");
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    // Create new user's account
    User user = new User(signUpRequest.getName(),
      signUpRequest.getEmail(),
      passwordEncoder.encode(signUpRequest.getPassword()));

    // creating new user
    userRepository.save(user);

    // Return success message
    Map<String, String> body = new HashMap<>();
    body.put("message", "User registered successfully!");
    return ResponseEntity.ok(body);
  }

  // validating the token after the user refreshes the page
  public ResponseEntity<Map<String, Object>> validateToken(String authHeader) {
    // Removing "Bearer " prefix
    String token = authHeader.substring(7);

    // Validate the token
    if(!jwtTokenProvider.validateToken(token)){
      Map<String, Object> errorResponse = new HashMap<>();
      errorResponse.put("error", "Invalid or expired token");
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
    }

    // Now since token is valid, we can extract the email
    // and load the user from the database and return user info
    String email = jwtTokenProvider.getEmailFromJWT(token);
    User user = userRepository.findByEmail(email).orElse(null);

    if (user == null) {
      Map<String, Object> errorResponse = new HashMap<>();
      errorResponse.put("error", "User not found");
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
    }

    // If user found, create UserDto and return it
    UserDto userDto = new UserDto(user.getId(), user.getName(), user.getEmail());
    Map<String, Object> response = new HashMap<>();
    response.put("user", userDto);
    return ResponseEntity.ok(response);
  }
}
