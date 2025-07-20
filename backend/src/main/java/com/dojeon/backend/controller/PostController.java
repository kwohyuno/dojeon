package com.dojeon.backend.controller;

import com.dojeon.backend.model.Post;
import com.dojeon.backend.service.PostService;
import com.dojeon.backend.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {
    
    @Autowired
    private PostService postService;
    
    @Autowired
    private LikeService likeService;
    
    // Get all posts
    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postService.getAllPosts();
        return ResponseEntity.ok(posts);
    }
    
    // Get posts by concert ID
    @GetMapping("/concert/{concertId}")
    public ResponseEntity<List<Post>> getPostsByConcertId(@PathVariable Long concertId) {
        List<Post> posts = postService.getPostsByConcertId(concertId);
        return ResponseEntity.ok(posts);
    }
    
    // Get post by ID
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        Optional<Post> post = postService.getPostById(id);
        if (post.isPresent()) {
            postService.incrementViewCount(id);
            return ResponseEntity.ok(post.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Create new post
    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        try {
            // userEmail is now sent from frontend
            // In a real app, you'd get this from the authenticated user session
            if (post.getUserEmail() == null) {
                // Fallback to author if userEmail not provided
                post.setUserEmail(post.getAuthor());
            }
            Post createdPost = postService.createPost(post);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // Update existing post
    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody Post postDetails) {
        Optional<Post> updatedPost = postService.updatePost(id, postDetails);
        if (updatedPost.isPresent()) {
            return ResponseEntity.ok(updatedPost.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Delete post
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        boolean deleted = postService.deletePost(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Toggle like for a post
    @PostMapping("/{id}/like")
    public ResponseEntity<?> toggleLike(@PathVariable Long id, @RequestBody Map<String, String> request) {
        try {
            String userEmail = request.get("userEmail");
            if (userEmail == null) {
                return ResponseEntity.badRequest().body("userEmail is required");
            }
            
            boolean isLiked = likeService.toggleLike(id, userEmail);
            long likeCount = likeService.getLikeCount(id);
            
            Map<String, Object> response = new HashMap<>();
            response.put("isLiked", isLiked);
            response.put("likeCount", likeCount);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // Check if user has liked a post
    @GetMapping("/{id}/like/check")
    public ResponseEntity<?> checkLike(@PathVariable Long id, @RequestParam String userEmail) {
        try {
            boolean hasLiked = likeService.hasUserLiked(id, userEmail);
            long likeCount = likeService.getLikeCount(id);
            
            Map<String, Object> response = new HashMap<>();
            response.put("hasLiked", hasLiked);
            response.put("likeCount", likeCount);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    // Search posts by title
    @GetMapping("/search/title")
    public ResponseEntity<List<Post>> searchPostsByTitle(@RequestParam String title) {
        List<Post> posts = postService.searchPostsByTitle(title);
        return ResponseEntity.ok(posts);
    }
    
    // Search posts by author
    @GetMapping("/search/author")
    public ResponseEntity<List<Post>> searchPostsByAuthor(@RequestParam String author) {
        List<Post> posts = postService.searchPostsByAuthor(author);
        return ResponseEntity.ok(posts);
    }
} 