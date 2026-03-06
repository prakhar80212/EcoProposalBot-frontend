import { useState, useEffect } from "react";
import axios from "axios";

export default function ImpactPage({ selectedHistory }) {
  const [products, setProducts] = useState([{ name: "", quantity: "" }]);
  const [impact, setImpact] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedHistory) {
      if (selectedHistory.products) {
        setProducts(selectedHistory.products.map(p => ({
          name: p.name || "",
          quantity: p.quantity?.toString() || ""
        })));
      }
      if (selectedHistory.plastic_saved_grams) {
        setImpact(selectedHistory);
      }
    }
  }, [selectedHistory]);

  const addProduct = () => {
    setProducts([...products, { name: "", quantity: "" }]);
  };

  const removeProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const updateProduct = (index, field, value) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
  };

  const generateImpact = async () => {
    try {
      setLoading(true);
      setImpact(null);

      const payload = {
        products: products.map(p => ({
          name: p.name,
          quantity: Number(p.quantity)
        }))
      };

      const response = await axios.post(
        "http://localhost:5000/api/impact/generate",
        payload
      );

      setImpact(response.data.data);
    } catch (error) {
      console.error(error);
      alert("Error generating impact analysis");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 to-green-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-teal-600 p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Impact Analysis</h1>
            <p className="text-green-100">Measure environmental impact and sustainability metrics</p>
          </div>

          <div className="p-8">
            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-700 mb-3 block">Products</label>
              <div className="space-y-3">
                {products.map((product, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Product Name"
                      className="flex-1 border-2 border-gray-200 p-3 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
                      value={product.name}
                      onChange={(e) => updateProduct(index, "name", e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Quantity"
                      className="w-32 border-2 border-gray-200 p-3 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
                      value={product.quantity}
                      onChange={(e) => updateProduct(index, "quantity", e.target.value)}
                    />
                    {products.length > 1 && (
                      <button
                        onClick={() => removeProduct(index)}
                        className="bg-red-500 text-white px-4 rounded-lg hover:bg-red-600 transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mb-8">
              <button
                onClick={addProduct}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-all font-semibold flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Product
              </button>
              <button
                onClick={generateImpact}
                disabled={loading}
                className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-3 rounded-lg hover:from-green-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </span>
                ) : "Generate Impact"}
              </button>
            </div>

            {impact && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-green-500 p-2 rounded-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600 font-medium">Plastic Saved</p>
                    </div>
                    <p className="text-3xl font-bold text-green-600">{impact.plastic_saved_grams}g</p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-blue-500 p-2 rounded-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600 font-medium">Carbon Avoided</p>
                    </div>
                    <p className="text-3xl font-bold text-blue-600">{impact.carbon_avoided_grams}g</p>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-xl border-2 border-yellow-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-yellow-500 p-2 rounded-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600 font-medium">Sourcing Score</p>
                    </div>
                    <p className="text-3xl font-bold text-yellow-600">{impact.local_sourcing_score}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="font-semibold text-lg text-gray-800">Local Sourcing Summary</p>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{impact.local_sourcing_summary}</p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl border-2 border-green-200">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="font-semibold text-lg text-gray-800">Impact Statement</p>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{impact.impact_statement}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
