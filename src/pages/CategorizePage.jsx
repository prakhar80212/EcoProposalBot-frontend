import { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function CategorizePage({ selectedHistory }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    material: "",
    price: "",
    color: "",
    size: ""
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedHistory) {
      if (selectedHistory.input) {
        setForm({
          name: selectedHistory.input.name || "",
          description: selectedHistory.input.description || "",
          material: selectedHistory.input.material || "",
          price: selectedHistory.input.price?.toString() || "",
          color: selectedHistory.input.color || "",
          size: selectedHistory.input.size || ""
        });
      }
      if (selectedHistory.output) {
        setResult({
          categoryId: selectedHistory.id,
          data: selectedHistory.output
        });
      }
    }
  }, [selectedHistory]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const categorizeProduct = async () => {
    try {
      setLoading(true);
      setResult(null);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/proposal/categorize`,
        {
          ...form,
          price: Number(form.price)
        }
      );

      setResult(response.data);
      
    } catch (error) {
      console.error(error);
      alert("Error categorizing product");
    } finally {
      setLoading(false);
    }
  };

  const exportPDF = async () => {
    const element = document.getElementById("categorize-result");
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 10;

    pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("product-categorization.pdf");
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Product Categorization</h1>
            <p className="text-purple-100">AI-powered product classification and tagging</p>
          </div>

          <div className="p-8">
            <div className="space-y-6 mb-8">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Product Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                  onChange={handleChange}
                  value={form.name}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Description</label>
                <textarea
                  name="description"
                  placeholder="Describe the product"
                  className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                  rows="3"
                  onChange={handleChange}
                  value={form.description}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Material</label>
                  <input
                    type="text"
                    name="material"
                    placeholder="e.g., Bamboo, Cotton"
                    className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                    onChange={handleChange}
                    value={form.material}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Price</label>
                  <input
                    type="number"
                    name="price"
                    placeholder="Enter price"
                    className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                    onChange={handleChange}
                    value={form.price}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Color</label>
                  <input
                    type="text"
                    name="color"
                    placeholder="Enter color"
                    className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                    onChange={handleChange}
                    value={form.color}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Size (Optional)</label>
                  <input
                    type="text"
                    name="size"
                    placeholder="Enter size"
                    className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                    onChange={handleChange}
                    value={form.size}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={categorizeProduct}
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Categorizing...
                </span>
              ) : "Categorize Product"}
            </button>

            {result && (
              <>
                <div id="categorize-result" className="mt-10 space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">Category ID</p>
                    <p className="font-semibold text-gray-800">{result.categoryId}</p>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-xl">
                    <p className="text-xs text-gray-500 mb-2">Primary Category</p>
                    <p className="font-bold text-2xl text-green-700">{result.data.primary_category}</p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-xl">
                    <p className="text-xs text-gray-500 mb-2">Sub Category</p>
                    <p className="font-bold text-xl text-purple-700">{result.data.sub_category}</p>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-5 rounded-xl">
                    <p className="text-sm font-semibold text-gray-700 mb-3">SEO Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {result.data.seo_tags.map((tag, idx) => (
                        <span key={idx} className="bg-yellow-200 text-yellow-800 px-3 py-1.5 rounded-full text-sm font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-teal-50 p-5 rounded-xl">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Sustainability Filters</p>
                    <div className="flex flex-wrap gap-2">
                      {result.data.sustainability_filters.map((filter, idx) => (
                        <span key={idx} className="bg-green-200 text-green-800 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {filter}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={exportPDF}
                  className="mt-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Export as PDF
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
