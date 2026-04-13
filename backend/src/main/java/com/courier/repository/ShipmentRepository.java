package com.courier.repository;
import com.courier.model.Shipment;
import com.courier.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
public interface ShipmentRepository extends JpaRepository<Shipment, Long> {
    List<Shipment> findByCustomer(User customer);
    Optional<Shipment> findByTrackingNumber(String trackingNumber);
}