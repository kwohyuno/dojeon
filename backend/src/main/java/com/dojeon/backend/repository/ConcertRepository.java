package com.dojeon.backend.repository;

import com.dojeon.backend.model.Concert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConcertRepository extends JpaRepository<Concert, Long> {
    
    List<Concert> findAllByOrderByConcertDateAsc();
    
    List<Concert> findByArtistContainingIgnoreCase(String artist);
    
    List<Concert> findByNameContainingIgnoreCase(String name);
} 