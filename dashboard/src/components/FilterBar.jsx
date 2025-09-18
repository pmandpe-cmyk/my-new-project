import { useState } from 'react';
import { ChevronDown, X, Filter, Calendar } from 'lucide-react';
import { cn } from '../lib/utils';

const FilterChip = ({ label, isActive, onClick, variant = 'default' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    error: 'bg-red-100 text-red-700 hover:bg-red-200',
    warning: 'bg-orange-100 text-orange-700 hover:bg-orange-200',
    success: 'bg-green-100 text-green-700 hover:bg-green-200'
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
        isActive 
          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
          : variants[variant]
      )}
    >
      {label}
      {isActive && (
        <X className="ml-1 h-3 w-3" />
      )}
    </button>
  );
};

const Dropdown = ({ label, options, value, onChange, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {Icon && <Icon className="mr-2 h-4 w-4 text-gray-500" />}
        {label}: {value}
        <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function FilterBar() {
  const [activeFilters, setActiveFilters] = useState({
    errors: false,
    needsReview: true,
    overdue: false
  });

  const [dropdownValues, setDropdownValues] = useState({
    owner: 'All Owners',
    channel: 'All Channels',
    campaign: 'All Campaigns',
    agent: 'All Agents',
    dateRange: 'Last 30 Days'
  });

  const toggleFilter = (filterKey) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterKey]: !prev[filterKey]
    }));
  };

  const updateDropdown = (key, value) => {
    setDropdownValues(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Quick Filter Chips */}
        <div className="flex items-center gap-3">
          <div className="flex items-center text-sm text-gray-500 mr-2">
            <Filter className="mr-1 h-4 w-4" />
            Quick Filters:
          </div>
          <FilterChip
            label="Errors"
            variant="error"
            isActive={activeFilters.errors}
            onClick={() => toggleFilter('errors')}
          />
          <FilterChip
            label="Needs Review"
            variant="warning"
            isActive={activeFilters.needsReview}
            onClick={() => toggleFilter('needsReview')}
          />
          <FilterChip
            label="Overdue"
            variant="warning"
            isActive={activeFilters.overdue}
            onClick={() => toggleFilter('overdue')}
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <Dropdown
            label="Owner"
            options={['All Owners', 'Sarah Johnson', 'Mike Chen', 'Lisa Park', 'David Kim']}
            value={dropdownValues.owner}
            onChange={(value) => updateDropdown('owner', value)}
          />
          
          <Dropdown
            label="Channel"
            options={['All Channels', 'Email', 'LinkedIn', 'Phone', 'Direct Mail']}
            value={dropdownValues.channel}
            onChange={(value) => updateDropdown('channel', value)}
          />
          
          <Dropdown
            label="Campaign"
            options={['All Campaigns', 'Q1 Enterprise', 'SMB Outreach', 'Product Launch', 'Re-engagement']}
            value={dropdownValues.campaign}
            onChange={(value) => updateDropdown('campaign', value)}
          />
          
          <Dropdown
            label="Agent Config"
            options={['All Agents', 'Agent A', 'Agent B', 'Agent C']}
            value={dropdownValues.agent}
            onChange={(value) => updateDropdown('agent', value)}
          />
          
          <Dropdown
            label="Date Range"
            icon={Calendar}
            options={['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'This Quarter', 'Custom Range']}
            value={dropdownValues.dateRange}
            onChange={(value) => updateDropdown('dateRange', value)}
          />

          {/* Preset Filters */}
          <Dropdown
            label="Presets"
            options={['All Data', 'High Priority', 'Recent Activity', 'Stalled Leads', 'Ready to Contact']}
            value="All Data"
            onChange={(value) => console.log('Preset:', value)}
          />
        </div>
      </div>

      {/* Active Filters Summary */}
      {Object.values(activeFilters).some(Boolean) && (
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
          <span>Active filters:</span>
          {Object.entries(activeFilters)
            .filter(([_, isActive]) => isActive)
            .map(([key, _]) => (
              <span key={key} className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                <button 
                  onClick={() => toggleFilter(key)}
                  className="ml-1 hover:text-blue-900"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
        </div>
      )}
    </div>
  );
}
