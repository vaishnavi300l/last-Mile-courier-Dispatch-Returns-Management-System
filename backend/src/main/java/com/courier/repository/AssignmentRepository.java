package com.courier.repository;
import com.courier.model.Assignment;
import com.courier.model.User;
import com.courier.model.Shipment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findByAgent(User agent);
    Optional<Assignment> findByShipment(Shipment shipment);
}