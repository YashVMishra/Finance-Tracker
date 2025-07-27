package com.personalfinance.backend.security.jwt;

import com.personalfinance.backend.security.CustomUserDetails;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtTokenProvider {

  private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

  @Value("${jwt.secret}")
  private String jwtSecret;

  @Value("${jwt.expiration.ms}")
  private int jwtExpirationMs;

  private SecretKey key() {
    return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
  }

  public String generateToken(Authentication authentication) {
    CustomUserDetails userPrincipal = (CustomUserDetails) authentication.getPrincipal();

    Date now = new Date();
    Date expiryDate = new Date(now.getTime() + jwtExpirationMs);

    return Jwts.builder()
      .setSubject(userPrincipal.getUsername()) // ✅ changed from `.subject(...)`
      .setIssuedAt(now)
      .setExpiration(expiryDate)
      .signWith(key(), SignatureAlgorithm.HS512)
      .compact();
  }

  public String generateTokenFromEmail(String email) {
    Date now = new Date();
    Date expiryDate = new Date(now.getTime() + jwtExpirationMs);

    return Jwts.builder()
      .setSubject(email)
      .setIssuedAt(now)
      .setExpiration(expiryDate)
      .signWith(key(), SignatureAlgorithm.HS512)
      .compact();
  }

  public String getEmailFromJWT(String token) {
    Claims claims = Jwts.parserBuilder()
      .setSigningKey(key()) // ✅ changed from `.verifyWith(...)`
      .build()
      .parseClaimsJws(token) // ✅ changed from `.parseSignedClaims(...)`
      .getBody();

    return claims.getSubject();
  }

  public boolean validateToken(String authToken) {
    try {
      Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(authToken);
      return true;
    } catch (MalformedJwtException ex) {
      logger.error("Invalid JWT token: {}", ex.getMessage());
    } catch (ExpiredJwtException ex) {
      logger.error("Expired JWT token: {}", ex.getMessage());
    } catch (UnsupportedJwtException ex) {
      logger.error("Unsupported JWT token: {}", ex.getMessage());
    } catch (IllegalArgumentException ex) {
      logger.error("JWT claims string is empty: {}", ex.getMessage());
    } catch (Exception ex) {
      logger.error("JWT validation error: {}", ex.getMessage());
    }
    return false;
  }
}
