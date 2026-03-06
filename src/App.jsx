import { useState } from 'react';
import './App.css'
import ProposalPage from "./pages/ProposalPage";
import HistoryPage from './pages/HistoryPage';
import CategorizePage from './pages/CategorizePage';
import CategorizeHistoryPage from './pages/CategorizeHistoryPage';
import ImpactPage from './pages/ImpactPage';
import ImpactHistoryPage from './pages/ImpactHistoryPage';

function App() {
  const [activeTab, setActiveTab] = useState('proposal');
  const [selectedHistory, setSelectedHistory] = useState(null);

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <aside className="w-80 h-screen flex flex-col bg-white shadow-xl border-r border-gray-200">
        <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <h2 className="text-xl font-bold">History</h2>
          <p className="text-sm text-blue-100 mt-1">Recent activities</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'proposal' && <HistoryPage onSelect={setSelectedHistory} />}
          {activeTab === 'categorize' && <CategorizeHistoryPage onSelect={setSelectedHistory} />}
          {activeTab === 'impact' && <ImpactHistoryPage onSelect={setSelectedHistory} />}
        </div>
      </aside>
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white shadow-md border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => { setActiveTab('proposal'); setSelectedHistory(null); }}
              className={`px-8 py-4 font-semibold transition-all duration-200 relative ${
                activeTab === 'proposal'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Proposal Generator
              </span>
            </button>
            <button
              onClick={() => { setActiveTab('categorize'); setSelectedHistory(null); }}
              className={`px-8 py-4 font-semibold transition-all duration-200 ${
                activeTab === 'categorize'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Product Categorization
              </span>
            </button>
            <button
              onClick={() => { setActiveTab('impact'); setSelectedHistory(null); }}
              className={`px-8 py-4 font-semibold transition-all duration-200 ${
                activeTab === 'impact'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Impact Analysis
              </span>
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'proposal' && <ProposalPage selectedHistory={selectedHistory} />}
          {activeTab === 'categorize' && <CategorizePage selectedHistory={selectedHistory} />}
          {activeTab === 'impact' && <ImpactPage selectedHistory={selectedHistory} />}
        </div>
      </main>
    </div>
  );
}

export default App;
