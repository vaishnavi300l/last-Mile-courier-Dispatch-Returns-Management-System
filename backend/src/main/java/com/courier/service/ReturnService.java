package com.courier.service;
import com.courier.model.*;
import com.courier.repository.*;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReturnService {
    private final ReturnRequestRepository returnRepo;
    private final ShipmentRepository shipRepo;
    
    public ReturnRequest requestReturn(Long shipId, String reason) {
        Shipment s = shipRepo.findById(shipId).orElseThrow();
        ReturnRequest rr = new ReturnRequest();
        rr.setShipment(s);
        rr.setReason(reason);
        rr.setStatus("PENDING");
        s.setStatus(ShipmentStatus.RETURN_INITIATED);
        shipRepo.save(s);
        return returnRepo.save(rr);
    }
    
    public List<ReturnRequest> getAll() { return returnRepo.findAll(); }
    
    public ReturnRequest updateStatus(Long id, String status) {
        ReturnRequest rr = returnRepo.findById(id).orElseThrow();
        rr.setStatus(status);
        if(status.equals("APPROVED")) {
            Shipment s = rr.getShipment();
            s.setStatus(ShipmentStatus.RETURN_COMPLETED);
            shipRepo.save(s);
        }
        return returnRepo.save(rr);
    }
}
