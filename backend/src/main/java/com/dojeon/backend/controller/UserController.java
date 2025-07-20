package com.dojeon.backend.controller;

import com.dojeon.backend.model.User;
import com.dojeon.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    // Register new user
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            User registeredUser = userService.registerUser(user);
            
            // Return user info without password
            Map<String, Object> response = new HashMap<>();
            response.put("id", registeredUser.getId());
            response.put("email", registeredUser.getEmail());
            response.put("name", registeredUser.getName());
            response.put("message", "User registered successfully");
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    // Login user
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");
        
        Optional<User> user = userService.validateLogin(email, password);
        
        if (user.isPresent()) {
            Map<String, Object> response = new HashMap<>();
            response.put("id", user.get().getId());
            response.put("email", user.get().getEmail());
            response.put("name", user.get().getName());
            response.put("message", "Login successful");
            return ResponseEntity.ok(response);
        } else {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid email or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }
    
    // Check if email exists
    @GetMapping("/check-email")
    public ResponseEntity<?> checkEmail(@RequestParam String email) {
        boolean exists = userService.existsByEmail(email);
        Map<String, Object> response = new HashMap<>();
        response.put("exists", exists);
        return ResponseEntity.ok(response);
    }
    
    // Get user profile for MyPage
    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(@RequestParam String email) {
        try {
            UserService.UserProfile profile = userService.getUserProfile(email);
            return ResponseEntity.ok(profile);
        } catch (RuntimeException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    // Get user statistics for MyPage
    @GetMapping("/statistics")
    public ResponseEntity<?> getUserStatistics(@RequestParam String email) {
        try {
            UserService.UserStatistics statistics = userService.getUserStatistics(email);
            return ResponseEntity.ok(statistics);
        } catch (RuntimeException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    // Get user activity for MyPage
    @GetMapping("/activity")
    public ResponseEntity<?> getUserActivity(@RequestParam String email) {
        try {
            UserService.UserActivity activity = userService.getUserActivity(email);
            return ResponseEntity.ok(activity);
        } catch (RuntimeException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
    
    // Update user profile
    @PutMapping("/update-profile")
    public ResponseEntity<?> updateProfile(@RequestBody Map<String, String> updateRequest) {
        try {
            String currentEmail = updateRequest.get("email");
            String newName = updateRequest.get("newName");
            String newEmail = updateRequest.get("newEmail");
            
            User updatedUser = userService.updateProfile(currentEmail, newName, newEmail);
            
            Map<String, Object> response = new HashMap<>();
            response.put("id", updatedUser.getId());
            response.put("email", updatedUser.getEmail());
            response.put("name", updatedUser.getName());
            response.put("message", "Profile updated successfully");
            
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
} 