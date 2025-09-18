import { useState } from 'react';
import { Mail, Phone, Linkedin, User, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { mockLeads } from '../lib/utils';

const StatusBadge = ({ status }) => {
  const variants = {
    'In Progress': 'bg-blue-100 text-blue-700',
    'Needs Review': 'bg-orange-100 text-orange-700',
    'First Touch Scheduled': 'bg-purple-100 text-purple-700',
    'Meeting Booked': 'bg-green-100 text-green-700',
    'No Response': 'bg-gray-100 text-gray-700',
    'Opted Out': 'bg-red-100 text-red-700',
    'Error': 'bg-red-100 text-red-700'
  };

  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      variants[status] || 'bg-gray-100 text-gray-700'
    )}>
      {status}
    </span>
  );
};

const OutreachSummary = ({ summary }) => {
  const chips = [];
  
  if (summary.sent > 0) {
    chips.push(
      <span key="sent" className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
        {summary.sent} Sent
      </span>
    );
  }
  
  if (summary.queued > 0) {
    chips.push(
      <span key="queued" className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">
        {summary.queued} Queued
      </span>
    );
  }
  
  if (summary.errors > 0) {
    chips.push(
      <span key="errors" className="inline-flex items-center px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
        {summary.errors} Error
      </span>
    );
  }

  return (
    <div className="flex flex-wrap gap-1">
      {chips}
    </div>
  );
};

const ChannelIcon = ({ type }) => {
  const icons = {
    email: Mail,
    phone: Phone,
    linkedin: Linkedin
  };
  
  const Icon = icons[type] || Mail;
  
  return <Icon className="h-4 w-4 text-gray-500" />;
};

const Avatar = ({ name, avatar }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">
        {avatar}
      </div>
      <span className="text-sm text-gray-900">{name}</span>
    </div>
  );
};

export default function DataTable({ onRowClick }) {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(new Set(mockLeads.map(lead => lead.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (id, checked) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedRows(newSelected);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedLeads = [...mockLeads].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }
    
    if (sortDirection === 'asc') {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    } else {
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
    }
  });

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold text-gray-900">Lead View</h3>
            <span className="text-sm text-gray-500">
              {selectedRows.size > 0 ? `${selectedRows.size} selected` : `${mockLeads.length} total leads`}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg">
              Lead View
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg">
              Outreach View
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="w-12 px-6 py-3">
                <input
                  type="checkbox"
                  checked={selectedRows.size === mockLeads.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('name')}
              >
                Lead Name
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('title')}
              >
                Title
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('company')}
              >
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Owner
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SDR Agent Config
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Outreach Summary
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Outreach
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Next Outreach
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedLeads.map((lead, index) => (
              <tr 
                key={lead.id}
                className={cn(
                  'hover:bg-gray-50 cursor-pointer transition-colors',
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                )}
                onClick={() => onRowClick?.(lead)}
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(lead.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleSelectRow(lead.id, e.target.checked);
                    }}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{lead.title}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{lead.company}</div>
                </td>
                <td className="px-6 py-4">
                  <Avatar name={lead.owner.name} avatar={lead.owner.avatar} />
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{lead.sdrAgent}</div>
                </td>
                <td className="px-6 py-4">
                  <OutreachSummary summary={lead.outreachSummary} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <ChannelIcon type={lead.lastOutreach.type} />
                    <span className="text-sm text-gray-900">{lead.lastOutreach.date}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <ChannelIcon type={lead.nextOutreach.type} />
                    <span className="text-sm text-gray-900">{lead.nextOutreach.date}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={lead.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing 1 to {mockLeads.length} of {mockLeads.length} results
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 text-sm font-medium text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700">
              1
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
