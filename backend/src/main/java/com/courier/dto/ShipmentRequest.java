package com.courier.dto;
import lombok.Data;
@Data
public class ShipmentRequest {
    private Long customerId;
    private String pickupAddress;
    private String deliveryAddress;
}