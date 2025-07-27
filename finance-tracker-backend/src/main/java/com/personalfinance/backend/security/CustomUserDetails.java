package com.personalfinance.backend.security;

import com.personalfinance.backend.model.User;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections; // For simple, single role or no roles
// import java.util.List;
// import java.util.stream.Collectors;

public class CustomUserDetails implements UserDetails {

  @Getter
  private Long id;

  @Getter
  private String name;

  private String email;
  private String password;
  private Collection<? extends GrantedAuthority> authorities;

  public CustomUserDetails(Long id, String name, String email, String password, Collection<? extends GrantedAuthority> authorities) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.authorities = authorities;
  }

  public static CustomUserDetails build(User user) {
    // For now, we are not using roles. If you add roles to your User entity,
    // you would map them to GrantedAuthority objects here.
    // Example with a single default role:
    // List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
    Collection<? extends GrantedAuthority> authorities = Collections.emptyList(); // No specific roles for now

    return new CustomUserDetails(
      user.getId(),
      user.getName(),
      user.getEmail(),
      user.getPassword(),
      authorities
    );
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return email; // Using email as the username
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}

