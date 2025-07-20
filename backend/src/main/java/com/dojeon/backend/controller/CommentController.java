package com.dojeon.backend.controller;

import com.dojeon.backend.model.Comment;
import com.dojeon.backend.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "http://localhost:3000")
public class CommentController {
    
    @Autowired
    private CommentService commentService;
    
    // Get comments by post ID
    @GetMapping("/post/{postId}")
    public ResponseEntity<List<Comment>> getCommentsByPostId(@PathVariable Long postId) {
        List<Comment> comments = commentService.getCommentsByPostId(postId);
        return ResponseEntity.ok(comments);
    }
    
    // Create new comment
    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
        try {
            // Set userEmail from author field for now
            // In a real app, you'd get this from the authenticated user
            if (comment.getUserEmail() == null && comment.getAuthor() != null) {
                comment.setUserEmail(comment.getAuthor());
            }
            Comment createdComment = commentService.createComment(comment);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdComment);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // Get comment by ID
    @GetMapping("/{id}")
    public ResponseEntity<Comment> getCommentById(@PathVariable Long id) {
        Optional<Comment> comment = commentService.getCommentById(id);
        if (comment.isPresent()) {
            return ResponseEntity.ok(comment.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Update existing comment
    @PutMapping("/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable Long id, @RequestBody Comment commentDetails) {
        Optional<Comment> updatedComment = commentService.updateComment(id, commentDetails);
        if (updatedComment.isPresent()) {
            return ResponseEntity.ok(updatedComment.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Delete comment
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        boolean deleted = commentService.deleteComment(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Get comment count by post ID
    @GetMapping("/post/{postId}/count")
    public ResponseEntity<Long> getCommentCountByPostId(@PathVariable Long postId) {
        long count = commentService.getCommentCountByPostId(postId);
        return ResponseEntity.ok(count);
    }
} 