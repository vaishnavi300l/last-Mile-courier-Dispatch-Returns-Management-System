package com.courier.service;
import com.courier.model.*;
import com.courier.repository.*;
import com.courier.dto.*;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import java.util.UUID;
import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ShipmentService {
    private final ShipmentRepository shipmentRepo;
    private final UserRepository userRepo;
    private final AssignmentRepository assignRepo;
    private final OTPVerificationRepository otpRepo;
    
    public Shipment create(ShipmentRequest req) {
        User c = userRepo.findById(req.getCustomerId()).orElseThrow();
        Shipment s = new Shipment();
        s.setCustomer(c);
        s.setPickupAddress(req.getPickupAddress());
        s.setDeliveryAddress(req.getDeliveryAddress());
        s.setStatus(ShipmentStatus.CREATED);
        s.setTrackingNumber(UUID.randomUUID().toString().substring(0,8).toUpperCase());
        return shipmentRepo.save(s);
    }
    
    public List<Shipment> getAll() { return shipmentRepo.findAll(); }
    public List<Shipment> getByCustomer(Long id) { return shipmentRepo.findByCustomer(userRepo.findById(id).orElseThrow()); }
    
    public Assignment assign(AssignRequest req) {
        Shipment s = shipmentRepo.findById(req.getShipmentId()).orElseThrow();
        User a = userRepo.findById(req.getAgentId()).orElseThrow();
        s.setStatus(ShipmentStatus.ASSIGNED);
        shipmentRepo.save(s);
        Assignment as = new Assignment();
        as.setShipment(s);
        as.setAgent(a);
        as.setStatus("ACCEPTED");
        return assignRepo.save(as);
    }

    public List<Assignment> getAgentAssignments(Long id) {
        return assignRepo.findByAgent(userRepo.findById(id).orElseThrow());
    }

    public Shipment updateStatus(Long id, ShipmentStatus newStatus) {
        Shipment s = shipmentRepo.findById(id).orElseThrow();
        s.setStatus(newStatus);
        if(newStatus == ShipmentStatus.OUT_FOR_DELIVERY) {
            OTPVerification otp = new OTPVerification();
            otp.setShipment(s);
            otp.setOtpCode("1234"); // Fixed OTP for easy prototype testing
            otp.setValidUntil(LocalDateTime.now().plusHours(24));
            otpRepo.save(otp);
            System.out.println("OTP Generated: " + otp.getOtpCode() + " for " + s.getTrackingNumber());
        }
        return shipmentRepo.save(s);
    }

    public boolean completeDelivery(OTPRequest req) {
        Shipment s = shipmentRepo.findByTrackingNumber(req.getTrackingNumber()).orElseThrow();
        OTPVerification otp = otpRepo.findByShipment(s).orElseThrow();
        if(otp.getOtpCode().equals(req.getOtpCode()) && LocalDateTime.now().isBefore(otp.getValidUntil())) {
            s.setStatus(ShipmentStatus.DELIVERED);
            shipmentRepo.save(s);
            return true;
        }
        return false;
    }
}