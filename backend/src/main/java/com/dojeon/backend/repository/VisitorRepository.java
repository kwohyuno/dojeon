package com.dojeon.backend.repository;

import com.dojeon.backend.model.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface VisitorRepository extends JpaRepository<Visitor, Long> {
    
    @Query("SELECT COUNT(v) FROM Visitor v WHERE CAST(v.visitDate AS date) = :date")
    long countVisitorsByDate(@Param("date") LocalDate date);
    
    @Query("SELECT COUNT(v) FROM Visitor v WHERE CAST(v.visitDate AS date) = :date AND v.userEmail = :userEmail")
    long countVisitorsByDateAndUser(@Param("date") LocalDate date, @Param("userEmail") String userEmail);
    
    @Query("SELECT v FROM Visitor v WHERE CAST(v.visitDate AS date) = :date ORDER BY v.visitDate DESC")
    List<Visitor> findVisitorsByDate(@Param("date") LocalDate date);
} 