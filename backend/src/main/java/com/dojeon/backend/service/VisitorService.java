package com.dojeon.backend.service;

import com.dojeon.backend.model.Visitor;
import com.dojeon.backend.repository.VisitorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class VisitorService {
    
    @Autowired
    private VisitorRepository visitorRepository;
    
    public void recordVisit(String userEmail) {
        Visitor visitor = new Visitor(userEmail);
        visitorRepository.save(visitor);
    }
    
    public long getTodayVisitors() {
        LocalDate today = LocalDate.now();
        return visitorRepository.countVisitorsByDate(today);
    }
    
    public long getTodayVisitorsByUser(String userEmail) {
        LocalDate today = LocalDate.now();
        return visitorRepository.countVisitorsByDateAndUser(today, userEmail);
    }
    
    public List<Visitor> getTodayVisitorsList() {
        LocalDate today = LocalDate.now();
        return visitorRepository.findVisitorsByDate(today);
    }
} 