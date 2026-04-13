import React, { useState, useEffect } from 'react';
import api from './api';

const ReturnsDashboard = () => {
  const [returns, setReturns] = useState([]);
  
  const loadData = async () => {
    const res = await api.get(`/returns`);
    setReturns(res.data);
  };
  
  useEffect(() => { loadData(); }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/returns/${id}/status`, { status });
    loadData();
  };

  return (
    <div className="card">
      <h2>Returns Management</h2>
      <div className="table-wrapper">
        <table>
          <thead><tr><th>ID</th><th>Tracking #</th><th>Reason</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {returns.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.shipment.trackingNumber}</td>
                <td>{r.reason}</td>
                <td><span className="badge badge-red">{r.status}</span></td>
                <td>
                  {r.status === 'PENDING' && (
                    <div className="flex-gap">
                      <button className="btn btn-sm btn-success" onClick={() => updateStatus(r.id, 'APPROVED')}>Approve</button>
                      <button className="btn btn-sm btn-secondary" onClick={() => updateStatus(r.id, 'REJECTED')}>Reject</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ReturnsDashboard;
