package com.dojeon.backend.repository;

import com.dojeon.backend.model.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    
    // Check if user has liked a specific post
    boolean existsByPostIdAndUserEmail(Long postId, String userEmail);
    
    // Get like by post ID and user email
    Optional<Like> findByPostIdAndUserEmail(Long postId, String userEmail);
    
    // Count likes for a specific post
    long countByPostId(Long postId);
    
    // Get all likes for a specific post
    List<Like> findByPostId(Long postId);
    
    // Delete like by post ID and user email
    void deleteByPostIdAndUserEmail(Long postId, String userEmail);
} 