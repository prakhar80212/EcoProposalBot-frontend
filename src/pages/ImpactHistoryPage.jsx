import { useEffect, useState } from "react";
import axios from "axios";

export default function ImpactHistoryPage({ onSelect }) {
  const [impacts, setImpacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/impact/history`)
      .then(res => {
        setImpacts(res.data.data);
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
      {impacts.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-400 text-sm">No impact analyses yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {impacts.map(item => (
            <div 
              key={item.id} 
              onClick={() => onSelect(item)}
              className="bg-gradient-to-br from-white to-green-50 border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Plastic Saved</span>
                  <span className="text-sm font-semibold text-green-600">{item.plastic_saved_grams}g</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Carbon Avoided</span>
                  <span className="text-sm font-semibold text-blue-600">{item.carbon_avoided_grams}g</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <span className="text-xs text-gray-500">Sourcing Score</span>
                  <span className="text-sm font-semibold text-yellow-600">{item.local_sourcing_score}</span>
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <svg className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
