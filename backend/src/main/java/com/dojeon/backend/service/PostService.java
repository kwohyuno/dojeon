package com.dojeon.backend.service;

import com.dojeon.backend.model.Post;
import com.dojeon.backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    
    @Autowired
    private PostRepository postRepository;
    
    // Get all posts
    public List<Post> getAllPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc();
    }
    
    // Get posts by concert ID
    public List<Post> getPostsByConcertId(Long concertId) {
        return postRepository.findByConcertIdOrderByCreatedAtDesc(concertId);
    }
    
    // Get post by ID
    public Optional<Post> getPostById(Long id) {
        return postRepository.findById(id);
    }
    
    // Create new post
    @Transactional
    public Post createPost(Post post) {
        return postRepository.save(post);
    }
    
    // Update existing post
    @Transactional
    public Optional<Post> updatePost(Long id, Post postDetails) {
        return postRepository.findById(id)
                .map(post -> {
                    post.setTitle(postDetails.getTitle());
                    post.setContent(postDetails.getContent());
                    return postRepository.save(post);
                });
    }
    
    // Delete post
    @Transactional
    public boolean deletePost(Long id) {
        if (postRepository.existsById(id)) {
            postRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    // Increment view count
    public void incrementViewCount(Long postId) {
        postRepository.incrementViewCount(postId);
    }
    
    // Increment like count
    public void incrementLikeCount(Long postId) {
        postRepository.incrementLikeCount(postId);
    }
    
    // Decrement like count
    public void decrementLikeCount(Long postId) {
        postRepository.decrementLikeCount(postId);
    }
    
    // Search posts by title
    public List<Post> searchPostsByTitle(String title) {
        return postRepository.findByTitleContainingIgnoreCase(title);
    }
    
    // Search posts by author
    public List<Post> searchPostsByAuthor(String author) {
        return postRepository.findByAuthorContainingIgnoreCase(author);
    }
} 