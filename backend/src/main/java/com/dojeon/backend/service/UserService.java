package com.dojeon.backend.service;

import com.dojeon.backend.model.User;
import com.dojeon.backend.repository.UserRepository;
import com.dojeon.backend.repository.PostRepository;
import com.dojeon.backend.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.time.LocalDateTime;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PostRepository postRepository;
    
    @Autowired
    private CommentRepository commentRepository;
    
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    
    // Register new user
    @Transactional
    public User registerUser(User user) {
        // Check if user already exists
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("User with this email already exists");
        }
        
        // Encrypt password before saving
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);
        
        return userRepository.save(user);
    }
    
    // Find user by email
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    // Check if user exists by email
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
    
    // Validate user login
    public Optional<User> validateLogin(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> passwordEncoder.matches(password, user.getPassword()));
    }
    
    // Get user statistics for MyPage
    public UserStatistics getUserStatistics(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        long postCount = postRepository.countByUserEmail(userEmail);
        long commentCount = commentRepository.countByUserEmail(userEmail);
        
        // Calculate total likes from user's posts
        long likeCount = postRepository.findByUserEmail(userEmail)
                .stream()
                .mapToLong(post -> post.getLikeCount() != null ? post.getLikeCount() : 0)
                .sum();
        
        return new UserStatistics(postCount, commentCount, likeCount);
    }
    
    // Get user profile information
    public UserProfile getUserProfile(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        return new UserProfile(
            user.getEmail(),
            user.getName(),
            user.getCreatedAt() != null ? user.getCreatedAt() : LocalDateTime.now(),
            "Active"
        );
    }
    
    // Get user recent activity
    public UserActivity getUserActivity(String userEmail) {
        // Get recent posts by user
        var recentPosts = postRepository.findTop3ByUserEmailOrderByCreatedAtDesc(userEmail);
        
        // Get recent comments by user
        var recentComments = commentRepository.findTop3ByUserEmailOrderByCreatedAtDesc(userEmail);
        
        return new UserActivity(recentPosts, recentComments);
    }
    
    // Update user profile
    @Transactional
    public User updateProfile(String currentEmail, String newName, String newEmail) {
        User user = userRepository.findByEmail(currentEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Check if new email already exists (if email is being changed)
        if (!currentEmail.equals(newEmail) && userRepository.existsByEmail(newEmail)) {
            throw new RuntimeException("Email already exists");
        }
        
        // Update user information
        user.setName(newName);
        user.setEmail(newEmail);
        
        return userRepository.save(user);
    }
    
    // Inner classes for MyPage data
    public static class UserStatistics {
        private final long postCount;
        private final long commentCount;
        private final long likeCount;
        
        public UserStatistics(long postCount, long commentCount, long likeCount) {
            this.postCount = postCount;
            this.commentCount = commentCount;
            this.likeCount = likeCount;
        }
        
        public long getPostCount() { return postCount; }
        public long getCommentCount() { return commentCount; }
        public long getLikeCount() { return likeCount; }
    }
    
    public static class UserProfile {
        private final String email;
        private final String name;
        private final LocalDateTime memberSince;
        private final String status;
        
        public UserProfile(String email, String name, LocalDateTime memberSince, String status) {
            this.email = email;
            this.name = name;
            this.memberSince = memberSince;
            this.status = status;
        }
        
        public String getEmail() { return email; }
        public String getName() { return name; }
        public LocalDateTime getMemberSince() { return memberSince; }
        public String getStatus() { return status; }
    }
    
    public static class UserActivity {
        private final java.util.List<com.dojeon.backend.model.Post> recentPosts;
        private final java.util.List<com.dojeon.backend.model.Comment> recentComments;
        
        public UserActivity(java.util.List<com.dojeon.backend.model.Post> recentPosts, 
                          java.util.List<com.dojeon.backend.model.Comment> recentComments) {
            this.recentPosts = recentPosts;
            this.recentComments = recentComments;
        }
        
        public java.util.List<com.dojeon.backend.model.Post> getRecentPosts() { return recentPosts; }
        public java.util.List<com.dojeon.backend.model.Comment> getRecentComments() { return recentComments; }
    }
} 