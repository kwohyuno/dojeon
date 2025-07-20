package com.dojeon.backend.repository;

import com.dojeon.backend.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    
    // Get all posts ordered by creation date (newest first)
    List<Post> findAllByOrderByCreatedAtDesc();
    
    // Search posts by title (case insensitive)
    List<Post> findByTitleContainingIgnoreCase(String title);
    
    // Search posts by author (case insensitive)
    List<Post> findByAuthorContainingIgnoreCase(String author);
    
    // Native query to increment view count
    @Modifying
    @Transactional
    @Query(value = "UPDATE posts SET view_count = view_count + 1 WHERE id = ?1", nativeQuery = true)
    void incrementViewCount(Long postId);
    
    // Increment like count
    @Modifying
    @Transactional
    @Query(value = "UPDATE posts SET like_count = like_count + 1 WHERE id = ?1", nativeQuery = true)
    void incrementLikeCount(Long postId);
    
    // Decrement like count
    @Modifying
    @Transactional
    @Query(value = "UPDATE posts SET like_count = like_count - 1 WHERE id = ?1", nativeQuery = true)
    void decrementLikeCount(Long postId);
    
    // Get posts by concert ID
    List<Post> findByConcertIdOrderByCreatedAtDesc(Long concertId);
    
    // Count posts by user email
    long countByUserEmail(String userEmail);
    
    // Get recent posts by user email
    List<Post> findTop3ByUserEmailOrderByCreatedAtDesc(String userEmail);
    
    // Get all posts by user email
    List<Post> findByUserEmail(String userEmail);
} 