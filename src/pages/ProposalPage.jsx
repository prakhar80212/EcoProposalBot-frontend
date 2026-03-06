import { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ProposalPage({ selectedHistory }) {
  const [form, setForm] = useState({
    budget: "",
    client_type: "",
    event_type: "",
    priority: ""
  });

  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedHistory) {
      setForm({
        budget: selectedHistory.budget?.toString() || "",
        client_type: selectedHistory.client_type || "",
        event_type: selectedHistory.event_type || "",
        priority: selectedHistory.priority || ""
      });
      if (selectedHistory.recommended_products) {
        setProposal(selectedHistory);
      }
    }
  }, [selectedHistory]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const calculateScore = () => {
    if (!proposal) return 0;

    let score = 0;

    proposal.recommended_products.forEach(item => {
      if (item.name.includes("Bamboo")) score += 2;
      if (item.name.includes("Recycled")) score += 2;
      if (item.name.includes("Compostable")) score += 3;
      if (item.name.includes("Organic")) score += 2;
      if (item.name.includes("Seed")) score += 3;
    });

    return score;
  };

  const generateProposal = async () => {
    try {
      setLoading(true);
      setProposal(null);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/proposal/generate`,
        {
          ...form,
          budget: Number(form.budget)
        }
      );

      setProposal(response.data.data);

    } catch (error) {
      console.error(error);
      alert("Error generating proposal");
    } finally {
      setLoading(false);
    }
  };

  const exportPDF = async () => {
    const element = document.getElementById("proposal-result");

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

    pdf.save("proposal.pdf");
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">AI Proposal Generator</h1>
            <p className="text-blue-100">Create intelligent, sustainable proposals in seconds</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Budget</label>
                <input
                  type="number"
                  name="budget"
                  placeholder="Enter budget amount"
                  value={form.budget}
                  className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Client Type</label>
                <select
                  name="client_type"
                  value={form.client_type}
                  className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                  onChange={handleChange}
                >
                  <option value="">Select Client Type</option>
                  <option>Corporate Office</option>
                  <option>Startup Company</option>
                  <option>NGO</option>
                  <option>Small Business</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Event Type</label>
                <select
                  name="event_type"
                  value={form.event_type}
                  className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                  onChange={handleChange}
                >
                  <option value="">Select Event Type</option>
                  <option>Employee Onboarding</option>
                  <option>Product Launch Event</option>
                  <option>Community Workshop</option>
                  <option>Sustainability Awareness Drive</option>
                  <option>Internal Training</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Priority</label>
                <select
                  name="priority"
                  value={form.priority}
                  className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                  onChange={handleChange}
                >
                  <option value="">Select Priority</option>
                  <option>High Sustainability</option>
                  <option>Maximum Sustainability</option>
                  <option>Brand Visibility</option>
                  <option>Low Cost</option>
                  <option>Budget Friendly</option>
                </select>
              </div>
            </div>

            <button
              onClick={generateProposal}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </span>
              ) : "Generate Proposal"}
            </button>

            {proposal && (
              <>
                <div id="proposal-result" className="mt-10">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Proposal Details</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-xs text-gray-500 mb-1">Client Type</p>
                        <p className="font-semibold text-gray-800">{form.client_type}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-xs text-gray-500 mb-1">Event Type</p>
                        <p className="font-semibold text-gray-800">{form.event_type}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-xs text-gray-500 mb-1">Priority</p>
                        <p className="font-semibold text-gray-800">{form.priority}</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-xs text-gray-500 mb-1">Budget</p>
                        <p className="font-semibold text-blue-600">₹ {form.budget}</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Recommended Products
                  </h3>

                  <div className="space-y-3 mb-6">
                    {proposal.recommended_products.map((item) => (
                      <div
                        key={item.product_id}
                        className="bg-white border-l-4 border-blue-500 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-lg text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-500 mt-1">
                              Quantity: <span className="font-medium text-gray-700">{item.quantity}</span>
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-2xl text-blue-600">
                              ₹ {item.total_cost}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl mb-4">
                    <p className="font-semibold text-lg mb-2 text-gray-800">Impact Positioning</p>
                    <p className="text-gray-700 leading-relaxed">
                      {proposal.impact_positioning}
                    </p>
                  </div>

                  {proposal.budget_summary && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl mb-4">
                      <h4 className="font-semibold text-lg mb-4 text-gray-800">Budget Summary</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <p className="text-xs text-gray-500 mb-1">Total Budget</p>
                          <p className="font-bold text-xl text-gray-800">₹ {proposal.budget_summary.total_budget}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <p className="text-xs text-gray-500 mb-1">Allocated</p>
                          <p className="font-bold text-xl text-green-600">₹ {proposal.budget_summary.allocated}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                          <p className="text-xs text-gray-500 mb-1">Remaining</p>
                          <p className="font-bold text-xl text-blue-600">₹ {proposal.budget_summary.remaining}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-xl border-2 border-yellow-200">
                    <div className="flex items-center gap-3">
                      <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="font-semibold text-lg text-gray-800">
                          Sustainability Score
                        </p>
                        <p className="text-3xl font-bold text-green-600">{calculateScore()}</p>
                      </div>
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