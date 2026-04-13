package com.courier.dto;
import lombok.Data;
@Data
public class AssignRequest {
    private Long shipmentId;
    private Long agentId;
}