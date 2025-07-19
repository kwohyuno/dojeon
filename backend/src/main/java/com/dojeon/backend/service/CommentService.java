package com.dojeon.backend.service;

import com.dojeon.backend.model.Comment;
import com.dojeon.backend.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    
    @Autowired
    private CommentRepository commentRepository;
    
    // Get comments by post ID
    public List<Comment> getCommentsByPostId(Long postId) {
        return commentRepository.findByPostIdOrderByCreatedAtAsc(postId);
    }
    
    // Create new comment
    @Transactional
    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }
    
    // Get comment by ID
    public Optional<Comment> getCommentById(Long id) {
        return commentRepository.findById(id);
    }
    
    // Update existing comment
    @Transactional
    public Optional<Comment> updateComment(Long id, Comment commentDetails) {
        return commentRepository.findById(id)
                .map(comment -> {
                    comment.setContent(commentDetails.getContent());
                    return commentRepository.save(comment);
                });
    }
    
    // Delete comment
    @Transactional
    public boolean deleteComment(Long id) {
        if (commentRepository.existsById(id)) {
            commentRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    // Count comments by post ID
    public long getCommentCountByPostId(Long postId) {
        return commentRepository.countByPostId(postId);
    }
} 