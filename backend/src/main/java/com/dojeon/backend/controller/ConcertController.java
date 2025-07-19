package com.dojeon.backend.controller;

import com.dojeon.backend.model.Concert;
import com.dojeon.backend.service.ConcertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/concerts")
@CrossOrigin(origins = "http://localhost:3000")
public class ConcertController {
    
    @Autowired
    private ConcertService concertService;
    
    @GetMapping
    public ResponseEntity<List<Concert>> getAllConcerts() {
        List<Concert> concerts = concertService.getAllConcerts();
        return ResponseEntity.ok(concerts);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Concert> getConcertById(@PathVariable Long id) {
        Optional<Concert> concert = concertService.getConcertById(id);
        if (concert.isPresent()) {
            return ResponseEntity.ok(concert.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping
    public ResponseEntity<Concert> createConcert(@RequestBody Concert concert) {
        try {
            Concert createdConcert = concertService.createConcert(concert);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdConcert);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Concert> updateConcert(@PathVariable Long id, @RequestBody Concert concertDetails) {
        Optional<Concert> updatedConcert = concertService.updateConcert(id, concertDetails);
        if (updatedConcert.isPresent()) {
            return ResponseEntity.ok(updatedConcert.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConcert(@PathVariable Long id) {
        boolean deleted = concertService.deleteConcert(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/search/artist")
    public ResponseEntity<List<Concert>> searchConcertsByArtist(@RequestParam String artist) {
        List<Concert> concerts = concertService.searchConcertsByArtist(artist);
        return ResponseEntity.ok(concerts);
    }
    
    @GetMapping("/search/name")
    public ResponseEntity<List<Concert>> searchConcertsByName(@RequestParam String name) {
        List<Concert> concerts = concertService.searchConcertsByName(name);
        return ResponseEntity.ok(concerts);
    }
} 