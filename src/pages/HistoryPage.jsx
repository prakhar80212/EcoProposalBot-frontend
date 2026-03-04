import { useEffect, useState } from "react";
import axios from "axios";

export default function HistoryPage() {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/proposal/history`)
      .then(res => setProposals(res.data.data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Proposal History</h2>
      {proposals.map(p => (
        <div key={p.id} className="border p-3 mb-3 rounded shadow-sm">
          <p className="text-sm"><strong>Client:</strong> {p.client_type}</p>
          <p className="text-sm"><strong>Event:</strong> {p.event_type}</p>
          <p className="text-sm"><strong>Priority:</strong> {p.priority}</p>
          <p className="text-sm"><strong>Budget:</strong> ₹{p.budget}</p>
        </div>
      ))}
    </div>
  );
}