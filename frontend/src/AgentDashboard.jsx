import React, { useState, useEffect } from 'react';
import api from './api';

const AgentDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [assignments, setAssignments] = useState([]);
  
  const loadData = async () => {
    const res = await api.get(`/shipments/assignments/agent/${user.id}`);
    setAssignments(res.data);
  };
  
  useEffect(() => { loadData(); }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/shipments/${id}/status`, { status });
    loadData();
  };

  const completeDelivery = async (trackingNumber) => {
    const otp = prompt(`Enter OTP sent to customer for ${trackingNumber}`);
    if (otp) {
      try {
        await api.post('/shipments/delivery/verify', { trackingNumber, otpCode: otp });
        alert("Delivery Completed!");
        loadData();
      } catch (e) { alert(e.response?.data?.error || "Invalid OTP"); }
    }
  };

  return (
    <div className="card">
      <h2>Delivery Tasks</h2>
      <div className="table-wrapper">
        <table>
          <thead><tr><th>Tracking #</th><th>Destination</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {assignments.map(a => (
              <tr key={a.id}>
                <td>{a.shipment.trackingNumber}</td>
                <td>{a.shipment.deliveryAddress}</td>
                <td><span className="badge badge-yellow">{a.shipment.status}</span></td>
                <td>
                  <div className="flex-gap">
                    {a.shipment.status === 'ASSIGNED' && <button className="btn btn-sm" onClick={() => updateStatus(a.shipment.id, 'PICKED_UP')}>Mark Picked Up</button>}
                    {a.shipment.status === 'PICKED_UP' && <button className="btn btn-sm" onClick={() => updateStatus(a.shipment.id, 'IN_TRANSIT')}>In Transit</button>}
                    {a.shipment.status === 'IN_TRANSIT' && <button className="btn btn-sm" onClick={() => updateStatus(a.shipment.id, 'OUT_FOR_DELIVERY')}>Out for Delivery</button>}
                    {a.shipment.status === 'OUT_FOR_DELIVERY' && <button className="btn btn-sm btn-success" onClick={() => completeDelivery(a.shipment.trackingNumber)}>Enter OTP</button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AgentDashboard;
