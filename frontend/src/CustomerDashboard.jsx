import React, { useState, useEffect } from 'react';
import api from './api';

const CustomerDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [shipments, setShipments] = useState([]);
  const [newShipment, setNewShipment] = useState({ pickupAddress: '', deliveryAddress: '' });
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);

  const loadShipments = async () => {
    const res = await api.get(`/shipments/customer/${user.id}`);
    setShipments(res.data);
  };

  useEffect(() => { loadShipments(); }, []);

  const createShipment = async (e) => {
    e.preventDefault();
    await api.post('/shipments', { ...newShipment, customerId: user.id });
    setNewShipment({ pickupAddress: '', deliveryAddress: '' });
    loadShipments();
  };

  const trackShipment = async (e) => {
    e.preventDefault();
    try {
      const res = await api.get(`/shipments/track/${trackingNumber}`);
      setTrackingResult(res.data);
    } catch {
      alert("Shipment not found");
      setTrackingResult(null);
    }
  };

  const requestReturn = async (id) => {
    const reason = prompt("Enter return reason:");
    if(reason) {
      await api.post('/returns', { shipmentId: id, reason });
      loadShipments();
    }
  };

  return (
    <div>
      <div className="grid-2">
        <div className="card">
          <h2>Create Shipment</h2>
          <form onSubmit={createShipment}>
            <div className="input-group">
              <label>Pickup Address</label>
              <input required value={newShipment.pickupAddress} onChange={e => setNewShipment({...newShipment, pickupAddress: e.target.value})} />
            </div>
            <div className="input-group">
              <label>Delivery Address</label>
              <input required value={newShipment.deliveryAddress} onChange={e => setNewShipment({...newShipment, deliveryAddress: e.target.value})} />
            </div>
            <button className="btn">Create Request</button>
          </form>
        </div>
        <div className="card">
          <h2>Track Shipment</h2>
          <form onSubmit={trackShipment} className="flex-gap">
            <div className="input-group" style={{ marginBottom: 0, flex: 1 }}>
              <input placeholder="Tracking Number" value={trackingNumber} onChange={e => setTrackingNumber(e.target.value)} />
            </div>
            <button className="btn">Track</button>
          </form>
          {trackingResult && (
            <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--bg-color)', borderRadius: '8px' }}>
              <h3>Status: <span className="badge badge-blue">{trackingResult.status}</span></h3>
              <p className="text-muted">From: {trackingResult.pickupAddress}</p>
              <p className="text-muted">To: {trackingResult.deliveryAddress}</p>
            </div>
          )}
        </div>
      </div>
      <div className="card" style={{ marginTop: '2rem' }}>
        <h2>My Shipments</h2>
        <div className="table-wrapper">
          <table>
            <thead><tr><th>Tracking</th><th>Destination</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {shipments.map(s => (
                <tr key={s.id}>
                  <td><strong>{s.trackingNumber}</strong></td>
                  <td>{s.deliveryAddress}</td>
                  <td><span className="badge badge-gray">{s.status}</span></td>
                  <td>
                    {s.status === 'DELIVERED' && <button className="btn btn-sm btn-secondary" onClick={() => requestReturn(s.id)}>Return</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default CustomerDashboard;
