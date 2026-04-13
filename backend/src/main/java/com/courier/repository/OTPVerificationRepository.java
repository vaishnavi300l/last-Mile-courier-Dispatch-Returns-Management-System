package com.courier.repository;
import com.courier.model.OTPVerification;
import com.courier.model.Shipment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface OTPVerificationRepository extends JpaRepository<OTPVerification, Long> {
    Optional<OTPVerification> findByShipment(Shipment shipment);
}