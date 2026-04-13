import React, { useState, useEffect } from 'react';
import api from './api';

const DispatchDashboard = () => {
  const [shipments, setShipments] = useState([]);
  const [agents, setAgents] = useState([]);
  
  const loadData = async () => {
    const [s, a] = await Promise.all([api.get('/shipments'), api.get('/shipments/agents')]);
    setShipments(s.data);
    setAgents(a.data);
  };
  
  useEffect(() => { loadData(); }, []);
  
  const assignAgent = async (shipmentId, agentId) => {
    if(!agentId) return;
    await api.post('/shipments/assign', { shipmentId, agentId });
    loadData();
  };

  return (
    <div className="card">
      <h2>Dispatch Dashboard</h2>
      <div className="table-wrapper">
        <table>
          <thead><tr><th>Tracking #</th><th>Status</th><th>Pickup</th><th>Delivery</th><th>Assign Agent</th></tr></thead>
          <tbody>
            {shipments.map(s => (
              <tr key={s.id}>
                <td>{s.trackingNumber}</td>
                <td><span className="badge badge-blue">{s.status}</span></td>
                <td>{s.pickupAddress}</td>
                <td>{s.deliveryAddress}</td>
                <td>
                  {s.status === 'CREATED' ? (
                    <select className="input-group" style={{ margin: 0 }} onChange={(e) => assignAgent(s.id, e.target.value)}>
                      <option value="">Select Agent</option>
                      {agents.map(a => <option key={a.id} value={a.id}>{a.username}</option>)}
                    </select>
                  ) : <span className="text-muted">Assigned</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default DispatchDashboard;
