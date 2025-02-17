package com.pranay.springboot.fooddeliverymanagementapp.security;

import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtProvider {
	private SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

	public String populateAuthorities(Collection<? extends GrantedAuthority> collection) {
		Set<String> listOfAuthorities = new HashSet<>();

		for (GrantedAuthority authority : collection) {
			listOfAuthorities.add(authority.getAuthority());
		}
		return String.join(",", listOfAuthorities);
	}

	public String retrieveEmailFromJwtToken(String jwt) {
		jwt = jwt.substring(7);

		Claims claims = Jwts.parser().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
		String email = String.valueOf(claims.get("email"));

		return email;
	}

	public String generateToken(Authentication authentication) {
		Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

		String roles = populateAuthorities(authorities);

		String jwt = Jwts.builder().setIssuedAt(new Date()).setExpiration(new Date(new Date().getTime() + 43200000))
				.claim("email", authentication.getName()).claim("authorities", roles).signWith(key).compact();

		return jwt;
	}
}
