package com.courier;

import com.courier.model.Role;
import com.courier.model.User;
import com.courier.repository.UserRepository;
import com.courier.service.ShipmentService;
import com.courier.dto.ShipmentRequest;
import com.courier.dto.AssignRequest;
import com.courier.model.Shipment;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ShipmentService shipmentService;

    @Override
    public void run(String... args) throws Exception {
        if(userRepository.count() == 0) {
            System.out.println("Seeding default proxy users & tasks since Database is clean H2...");
            
            User admin = createIfNotExists("admin", "admin", Role.DISPATCH_MANAGER);
            User agent1 = createIfNotExists("agent1", "agent1", Role.DELIVERY_AGENT);
            User agent2 = createIfNotExists("agent2", "agent2", Role.DELIVERY_AGENT);
            User returns = createIfNotExists("returns", "returns", Role.RETURNS_MANAGER);
            User customer = createIfNotExists("customer", "customer", Role.CUSTOMER);
            
            // Seed default tasks for agent1
            ShipmentRequest sr1 = new ShipmentRequest();
            sr1.setCustomerId(customer.getId());
            sr1.setPickupAddress("123 Vendor Hub, Central");
            sr1.setDeliveryAddress("456 Receiver Lane, North");
            Shipment s1 = shipmentService.create(sr1);
            
            AssignRequest ar1 = new AssignRequest();
            ar1.setShipmentId(s1.getId());
            ar1.setAgentId(agent1.getId());
            shipmentService.assign(ar1);

            // Seed default tasks for agent2
            ShipmentRequest sr2 = new ShipmentRequest();
            sr2.setCustomerId(customer.getId());
            sr2.setPickupAddress("789 Supply Station, East");
            sr2.setDeliveryAddress("101 Residential Ave, South");
            Shipment s2 = shipmentService.create(sr2);
            
            AssignRequest ar2 = new AssignRequest();
            ar2.setShipmentId(s2.getId());
            ar2.setAgentId(agent2.getId());
            shipmentService.assign(ar2);
            
            System.out.println("Default user data and shipments successfully seeded!");
        }
    }

    private User createIfNotExists(String username, String password, Role role) {
        if(userRepository.findByUsername(username).isEmpty()) {
            User u = new User();
            u.setUsername(username);
            u.setPassword(password);
            u.setRole(role);
            return userRepository.save(u);
        }
        return userRepository.findByUsername(username).get();
    }
}
