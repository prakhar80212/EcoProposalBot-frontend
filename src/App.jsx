import './App.css'
import ProposalPage from "./pages/ProposalPage";
import HistoryPage from './pages/HistoryPage';

function App() {
  return (
    <div className="flex">
      <aside className="w-80 h-screen overflow-y-auto bg-gray-50 border-r">
        <HistoryPage />
      </aside>
      <main className="flex-1">
        <ProposalPage />
      </main>
    </div>
  );
}

export default App;
