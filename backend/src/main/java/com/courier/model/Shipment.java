package com.courier.model;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
@Entity
@Data
public class Shipment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String trackingNumber;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id")
    private User customer;
    private String pickupAddress;
    private String deliveryAddress;
    @Enumerated(EnumType.STRING)
    private ShipmentStatus status;
    private LocalDateTime createdAt = LocalDateTime.now();
}
