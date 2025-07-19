package com.dojeon.backend.repository;

import com.dojeon.backend.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    
    // Get comments by post ID, ordered by creation date (oldest first)
    List<Comment> findByPostIdOrderByCreatedAtAsc(Long postId);
    
    // Count comments by post ID
    long countByPostId(Long postId);
} 