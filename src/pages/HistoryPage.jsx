import { useEffect, useState } from "react";
import axios from "axios";

export default function HistoryPage({ onSelect }) {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/proposal/history`)
      .then(res => {
        setProposals(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {proposals.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-400 text-sm">No proposals yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {proposals.map(p => (
            <div 
              key={p.id} 
              onClick={() => onSelect(p)}
              className="bg-gradient-to-br from-white to-blue-50 border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{p.client_type}</h3>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">₹{p.budget}</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-600 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                  {p.event_type}
                </p>
                <p className="text-xs text-gray-500">{p.priority}</p>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
                <span className="text-xs text-gray-400">{new Date(p.created_at).toLocaleDateString()}</span>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}