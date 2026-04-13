package com.courier.dto;
import lombok.Data;
@Data
public class OTPRequest {
    private String trackingNumber;
    private String otpCode;
}