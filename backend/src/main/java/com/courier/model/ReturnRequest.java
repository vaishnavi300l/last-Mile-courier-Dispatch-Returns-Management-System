package com.courier.model;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
@Entity
@Data
public class ReturnRequest {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    private Shipment shipment;
    private String status; // PENDING, APPROVED, REJECTED
    private String reason;
    private LocalDateTime requestedAt = LocalDateTime.now();
}
