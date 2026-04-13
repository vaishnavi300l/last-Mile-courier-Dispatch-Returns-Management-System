package com.courier.controller;
import com.courier.model.*;
import com.courier.service.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import lombok.RequiredArgsConstructor;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/returns")
@CrossOrigin("*")
@RequiredArgsConstructor
public class ReturnController {
    private final ReturnService service;
    
    @PostMapping
    public ResponseEntity<?> requestReturn(@RequestBody Map<String, String> body) {
        Long shipId = Long.parseLong(body.get("shipmentId"));
        return ResponseEntity.ok(service.requestReturn(shipId, body.get("reason")));
    }
    
    @GetMapping
    public ResponseEntity<List<ReturnRequest>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(service.updateStatus(id, body.get("status")));
    }
}