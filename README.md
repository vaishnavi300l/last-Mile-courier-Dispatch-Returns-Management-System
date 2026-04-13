# last-Mile-courier-Dispatch-Returns-Management-System
Backend system for last-mile courier dispatch and returns management with shipment tracking, agent assignment, OTP verification, and reverse logistics.


📌 Features
Shipment tracking system
Delivery agent assignment and management
OTP-based delivery verification
Delivery status updates (pickup → out-for-delivery → delivered)
Return request and reverse logistics handling
Activity tracking and delivery attempts logging
Role-based operations (Customer, Agent, Dispatch Manager)

🛠️ Tech Stack
Backend: Java, Spring Boot
Database: SQL (MySQL / PostgreSQL / SQLite)
API: RESTful APIs
Tools: Maven, Swagger (API Docs)
📂 Core Modules
1. Shipment Management
Create and track shipments
View shipment activity and delivery attempts
2. Dispatch Management
Assign shipments to delivery agents
Manage agent availability
3. Delivery Workflow
Pickup → Out for Delivery → Delivered
OTP verification for successful delivery
Handle failed delivery attempts
4. Returns Management
Create return requests
Approve/reject returns
Schedule pickup and initiate refunds
🔗 Key APIs
Delivery Agent APIs
GET /api/delivery-agents/available
GET /api/delivery-agents/{id}/assignments
PUT /api/assignments/{id}/accept
PUT /api/assignments/{id}/reject
Shipment APIs
PUT /api/shipments/{id}/pickup
PUT /api/shipments/{id}/out-for-delivery
POST /api/shipments/{id}/deliver
POST /api/shipments/{id}/attempt-fail
GET /api/shipments/{id}/otp
Return APIs
POST /api/returns
GET /api/returns
PUT /api/returns/{id}/approve
PUT /api/returns/{id}/reject
PUT /api/returns/{id}/pickup
📊 Business Rules
Only Dispatch Manager can assign shipments
OTP valid for 15 minutes
Maximum 3 delivery attempts per shipment
Return allowed within 7 days after delivery
Refund issued within 5 days after pickup
Agent delivery limit: 20 shipments/day
Delivery radius: 10 km (configurable)
