package com.dojeon.backend.service;

import com.dojeon.backend.model.Like;
import com.dojeon.backend.repository.LikeRepository;
import com.dojeon.backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LikeService {
    
    @Autowired
    private LikeRepository likeRepository;
    
    @Autowired
    private PostRepository postRepository;
    
    // Toggle like for a post
    @Transactional
    public boolean toggleLike(Long postId, String userEmail) {
        boolean hasLiked = likeRepository.existsByPostIdAndUserEmail(postId, userEmail);
        
        if (hasLiked) {
            // Unlike: remove the like
            likeRepository.deleteByPostIdAndUserEmail(postId, userEmail);
            postRepository.decrementLikeCount(postId);
            return false; // now unliked
        } else {
            // Like: add the like
            Like like = new Like(postId, userEmail);
            likeRepository.save(like);
            postRepository.incrementLikeCount(postId);
            return true; // now liked
        }
    }
    
    // Check if user has liked a post
    public boolean hasUserLiked(Long postId, String userEmail) {
        return likeRepository.existsByPostIdAndUserEmail(postId, userEmail);
    }
    
    // Get like count for a post
    public long getLikeCount(Long postId) {
        return likeRepository.countByPostId(postId);
    }
} 