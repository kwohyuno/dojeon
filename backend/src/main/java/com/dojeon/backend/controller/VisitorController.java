package com.dojeon.backend.controller;

import com.dojeon.backend.service.VisitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/visitors")
@CrossOrigin(origins = "http://localhost:3000")
public class VisitorController {
    
    @Autowired
    private VisitorService visitorService;
    
    @PostMapping("/record")
    public ResponseEntity<Map<String, String>> recordVisit(@RequestParam String userEmail) {
        visitorService.recordVisit(userEmail);
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "Visit recorded successfully");
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/today")
    public ResponseEntity<Map<String, Object>> getTodayVisitors() {
        long todayVisitors = visitorService.getTodayVisitors();
        
        Map<String, Object> response = new HashMap<>();
        response.put("todayVisitors", todayVisitors);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/today/user/{userEmail}")
    public ResponseEntity<Map<String, Object>> getTodayVisitorsByUser(@PathVariable String userEmail) {
        long userVisits = visitorService.getTodayVisitorsByUser(userEmail);
        
        Map<String, Object> response = new HashMap<>();
        response.put("userVisits", userVisits);
        return ResponseEntity.ok(response);
    }
} 