import { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ProposalPage() {
  const [form, setForm] = useState({
    budget: "",
    client_type: "",
    event_type: "",
    priority: ""
  });

  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(false);

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

  // ✅ PDF Export Function
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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-6">
          AI Proposal Generator
        </h1>

        {/* FORM */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <input
            type="number"
            name="budget"
            placeholder="Budget"
            className="border p-2 rounded"
            onChange={handleChange}
          />

          <select
            name="client_type"
            className="border p-2 rounded"
            onChange={handleChange}
          >
            <option value="">Select Client Type</option>
            <option>Corporate Office</option>
            <option>Startup Company</option>
            <option>NGO</option>
            <option>Small Business</option>
          </select>

          <select
            name="event_type"
            className="border p-2 rounded"
            onChange={handleChange}
          >
            <option value="">Select Event Type</option>
            <option>Employee Onboarding</option>
            <option>Product Launch Event</option>
            <option>Community Workshop</option>
            <option>Sustainability Awareness Drive</option>
            <option>Internal Training</option>
          </select>

          <select
            name="priority"
            className="border p-2 rounded"
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

        <button
          onClick={generateProposal}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Generating..." : "Generate Proposal"}
        </button>

        {/* RESULT */}
        {proposal && (
          <>
            <div id="proposal-result" className="mt-8">
              <div className="border-b-2 border-blue-600 pb-4 mb-6">
                <h2 className="text-3xl font-bold text-blue-600 mb-4">Proposal Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Client Type</p>
                    <p className="font-semibold text-lg">{form.client_type}</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Event Type</p>
                    <p className="font-semibold text-lg">{form.event_type}</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Priority</p>
                    <p className="font-semibold text-lg">{form.priority}</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="text-sm text-gray-600">Budget</p>
                    <p className="font-semibold text-lg">₹ {form.budget}</p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Recommended Products
              </h3>

              <div className="space-y-3">
                {proposal.recommended_products.map((item) => (
                  <div
                    key={item.product_id}
                    className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold text-lg">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl text-blue-600">
                        ₹ {item.total_cost}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
                <p className="font-semibold text-lg mb-2 text-gray-800">Impact Positioning:</p>
                <p className="text-gray-700 leading-relaxed">
                  {proposal.impact_positioning}
                </p>
              </div>

              {proposal.budget_summary && (
                <div className="mt-4 p-5 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-lg mb-3 text-gray-800">Budget Summary</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Total Budget</p>
                      <p className="font-bold text-xl">₹ {proposal.budget_summary.total_budget}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Allocated</p>
                      <p className="font-bold text-xl text-green-600">₹ {proposal.budget_summary.allocated}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Remaining</p>
                      <p className="font-bold text-xl text-blue-600">₹ {proposal.budget_summary.remaining}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="font-semibold text-lg">
                  Sustainability Score: <span className="text-green-600 text-2xl">{calculateScore()}</span>
                </p>
              </div>
            </div>

            <button
              onClick={exportPDF}
              className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Export as PDF
            </button>
          </>
        )}
      </div>
    </div>
  );
}