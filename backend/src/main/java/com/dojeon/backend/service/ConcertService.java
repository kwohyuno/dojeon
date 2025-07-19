package com.dojeon.backend.service;

import com.dojeon.backend.model.Concert;
import com.dojeon.backend.repository.ConcertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ConcertService {
    
    @Autowired
    private ConcertRepository concertRepository;
    
    public List<Concert> getAllConcerts() {
        return concertRepository.findAllByOrderByConcertDateAsc();
    }
    
    public Optional<Concert> getConcertById(Long id) {
        return concertRepository.findById(id);
    }
    
    public Concert createConcert(Concert concert) {
        concert.setCreatedAt(LocalDateTime.now());
        concert.setUpdatedAt(LocalDateTime.now());
        return concertRepository.save(concert);
    }
    
    public Optional<Concert> updateConcert(Long id, Concert concertDetails) {
        return concertRepository.findById(id)
                .map(concert -> {
                    concert.setName(concertDetails.getName());
                    concert.setArtist(concertDetails.getArtist());
                    concert.setDescription(concertDetails.getDescription());
                    concert.setConcertDate(concertDetails.getConcertDate());
                    concert.setVenue(concertDetails.getVenue());
                    concert.setUpdatedAt(LocalDateTime.now());
                    return concertRepository.save(concert);
                });
    }
    
    public boolean deleteConcert(Long id) {
        if (concertRepository.existsById(id)) {
            concertRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public List<Concert> searchConcertsByArtist(String artist) {
        return concertRepository.findByArtistContainingIgnoreCase(artist);
    }
    
    public List<Concert> searchConcertsByName(String name) {
        return concertRepository.findByNameContainingIgnoreCase(name);
    }
} 