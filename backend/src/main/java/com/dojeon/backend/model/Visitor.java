package com.dojeon.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "visitors")
public class Visitor {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "visit_date", nullable = false)
    private LocalDateTime visitDate;
    
    @Column(name = "user_email")
    private String userEmail;
    

    
    public Visitor() {}
    
    public Visitor(String userEmail) {
        this.visitDate = LocalDateTime.now();
        this.userEmail = userEmail;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public LocalDateTime getVisitDate() {
        return visitDate;
    }
    
    public void setVisitDate(LocalDateTime visitDate) {
        this.visitDate = visitDate;
    }
    
    public String getUserEmail() {
        return userEmail;
    }
    
    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
    

} 