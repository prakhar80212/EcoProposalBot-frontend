import { useEffect, useState } from "react";
import axios from "axios";

export default function CategorizeHistoryPage({ onSelect }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/proposal/categorize/history`)
      .then(res => {
        const validData = (res.data.data || []).filter(
          item => item.input && item.output
        );
        setHistory(validData);
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
      {history.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <p className="text-gray-400 text-sm">No categorizations yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <div 
              key={item.id} 
              onClick={() => onSelect(item)}
              className="bg-gradient-to-br from-white to-purple-50 border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors line-clamp-1">{item.input.name}</h3>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full whitespace-nowrap ml-2">₹{item.input.price}</span>
              </div>
              <p className="text-xs text-gray-500 mb-2 line-clamp-1">{item.input.material}</p>
              <div className="pt-2 border-t border-gray-200">
                <p className="text-xs font-medium text-blue-600">{item.output.primary_category}</p>
                <p className="text-xs text-gray-500">{item.output.sub_category}</p>
              </div>
              {item.output.sustainability_filters && item.output.sustainability_filters.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {item.output.sustainability_filters.slice(0, 2).map((filter, idx) => (
                    <span key={idx} className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                      {filter}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-3 flex justify-end">
                <svg className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
