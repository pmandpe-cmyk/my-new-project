import { useState } from 'react';
import TopNavigation from './components/TopNavigation';
import Sidebar from './components/Sidebar';
import KPICards from './components/KPICards';
import FilterBar from './components/FilterBar';
import DataTable from './components/DataTable';
import DetailPanel from './components/DetailPanel';

function App() {
  const [selectedLead, setSelectedLead] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleRowClick = (lead) => {
    setSelectedLead(lead);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setSelectedLead(null);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Top Navigation */}
      <TopNavigation />
      
      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Filter Bar */}
          <FilterBar />
          
          {/* Dashboard Content */}
          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Page Header */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Sales Command Center
                </h1>
                <p className="text-gray-600">
                  AI SDR outreach monitoring and lead management dashboard
                </p>
              </div>

              {/* KPI Cards */}
              <KPICards />
              
              {/* Data Table */}
              <DataTable onRowClick={handleRowClick} />
            </div>
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      <DetailPanel 
        lead={selectedLead}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
      />
    </div>
  );
}

export default App;