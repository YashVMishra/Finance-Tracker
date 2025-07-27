package com.personalfinance.backend.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtils {

  public static Long getCurrentUserId() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails) {
      return ((CustomUserDetails) authentication.getPrincipal()).getId();
    }

    return null;
  }

  public static String getUserEmail() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    if (authentication != null && authentication.getPrincipal() instanceof CustomUserDetails) {
      return ((CustomUserDetails) authentication.getPrincipal()).getUsername();
    }

    return null;
  }
}
