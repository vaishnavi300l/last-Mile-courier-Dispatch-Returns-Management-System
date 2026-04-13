package com.courier.controller;
import com.courier.model.*;
import com.courier.service.*;
import com.courier.dto.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/shipments")
@CrossOrigin("*")
@RequiredArgsConstructor
public class ShipmentController {
    private final ShipmentService service;
    private final ReturnService returnService;
    private final com.courier.repository.UserRepository userRepo;
    
    @PostMapping
    public ResponseEntity<?> create(@RequestBody ShipmentRequest req) {
        return ResponseEntity.ok(service.create(req));
    }
    
    @GetMapping
    public ResponseEntity<List<Shipment>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }
    
    @GetMapping("/customer/{id}")
    public ResponseEntity<List<Shipment>> getByCustomer(@PathVariable Long id) {
        return ResponseEntity.ok(service.getByCustomer(id));
    }

    @GetMapping("/track/{trackingNumber}")
    public ResponseEntity<?> track(@PathVariable String trackingNumber) {
        // Find shipment by tracking, simplified
        Shipment s = service.getAll().stream().filter(x -> x.getTrackingNumber().equals(trackingNumber)).findFirst().orElseThrow();
        return ResponseEntity.ok(s);
    }
    
    @PostMapping("/assign")
    public ResponseEntity<?> assign(@RequestBody AssignRequest req) {
        return ResponseEntity.ok(service.assign(req));
    }
    
    @GetMapping("/assignments/agent/{id}")
    public ResponseEntity<?> getAgentAssignments(@PathVariable Long id) {
        return ResponseEntity.ok(service.getAgentAssignments(id));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        ShipmentStatus status = ShipmentStatus.valueOf(body.get("status"));
        return ResponseEntity.ok(service.updateStatus(id, status));
    }
    
    @PostMapping("/delivery/verify")
    public ResponseEntity<?> verifyDelivery(@RequestBody OTPRequest req) {
        boolean success = service.completeDelivery(req);
        if(success) return ResponseEntity.ok(Map.of("message", "Delivery successful"));
        return ResponseEntity.badRequest().body(Map.of("error", "Invalid or expired OTP"));
    }

    @GetMapping("/agents")
    public ResponseEntity<?> getAgents() {
        return ResponseEntity.ok(userRepo.findByRole(Role.DELIVERY_AGENT));
    }
}