import { useState } from 'react';
import { X, Mail, Phone, Linkedin, Clock, CheckCircle, AlertTriangle, RotateCcw, UserX, Calendar, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

const mockOutreachHistory = [
  {
    id: 1,
    type: 'email',
    status: 'sent',
    timestamp: '2024-01-15 09:30',
    template: 'Initial Outreach - Q1 Enterprise',
    approval: 'auto-approved',
    subject: 'Quick question about your sales tech stack',
    isUpcoming: false
  },
  {
    id: 2,
    type: 'linkedin',
    status: 'sent',
    timestamp: '2024-01-13 14:15',
    template: 'LinkedIn Connection Request',
    approval: 'auto-approved',
    subject: 'Connection request with personalized message',
    isUpcoming: false
  },
  {
    id: 3,
    type: 'email',
    status: 'queued',
    timestamp: '2024-01-20 10:00',
    template: 'Follow-up - Day 5',
    approval: 'pending',
    subject: 'Following up on my previous email',
    isUpcoming: true
  },
  {
    id: 4,
    type: 'phone',
    status: 'scheduled',
    timestamp: '2024-01-22 15:00',
    template: 'Phone Call - Sequence Step 3',
    approval: 'auto-approved',
    subject: 'Outbound call attempt',
    isUpcoming: true
  }
];

const ChannelIcon = ({ type, className }) => {
  const icons = {
    email: Mail,
    phone: Phone,
    linkedin: Linkedin
  };
  
  const Icon = icons[type] || Mail;
  
  return <Icon className={className} />;
};

const StatusIcon = ({ status }) => {
  const statusConfig = {
    sent: { icon: CheckCircle, className: 'text-green-500' },
    queued: { icon: Clock, className: 'text-yellow-500' },
    scheduled: { icon: Calendar, className: 'text-blue-500' },
    error: { icon: AlertTriangle, className: 'text-red-500' },
    paused: { icon: UserX, className: 'text-gray-500' }
  };
  
  const config = statusConfig[status] || statusConfig.queued;
  const Icon = config.icon;
  
  return <Icon className={cn('h-4 w-4', config.className)} />;
};

const OutreachItem = ({ outreach, isLast }) => {
  const isCompleted = !outreach.isUpcoming;
  
  return (
    <div className="relative">
      {/* Timeline line */}
      {!isLast && (
        <div 
          className={cn(
            'absolute left-6 top-12 w-0.5 h-full',
            isCompleted ? 'bg-green-200' : 'bg-gray-200'
          )}
        />
      )}
      
      {/* Timeline dot */}
      <div className="flex items-start space-x-4">
        <div 
          className={cn(
            'flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center',
            isCompleted 
              ? 'bg-green-50 border-green-200' 
              : 'bg-blue-50 border-blue-200'
          )}
        >
          <ChannelIcon 
            type={outreach.type} 
            className={cn(
              'h-5 w-5',
              isCompleted ? 'text-green-600' : 'text-blue-600'
            )}
          />
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0 pb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h4 className="text-sm font-medium text-gray-900">
                {outreach.template}
              </h4>
              <StatusIcon status={outreach.status} />
            </div>
            <span className="text-xs text-gray-500">
              {outreach.timestamp}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 mt-1">
            {outreach.subject}
          </p>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-4">
              <span className={cn(
                'inline-flex items-center px-2 py-1 rounded text-xs font-medium',
                outreach.approval === 'auto-approved' 
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              )}>
                {outreach.approval}
              </span>
              <span className={cn(
                'inline-flex items-center px-2 py-1 rounded text-xs font-medium',
                isCompleted
                  ? 'bg-green-100 text-green-700'
                  : 'bg-blue-100 text-blue-700'
              )}>
                {outreach.status}
              </span>
            </div>
            
            {/* Actions */}
            <div className="flex items-center space-x-2">
              {outreach.status === 'queued' && (
                <>
                  <button className="text-blue-600 hover:text-blue-800 text-xs">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-800 text-xs">
                    Cancel
                  </button>
                </>
              )}
              {outreach.status === 'error' && (
                <button className="flex items-center text-blue-600 hover:text-blue-800 text-xs">
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Retry
                </button>
              )}
              <button className="text-gray-600 hover:text-gray-800 text-xs">
                <ExternalLink className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DetailPanel({ lead, isOpen, onClose }) {
  const [showCompleted, setShowCompleted] = useState(true);
  const [showUpcoming, setShowUpcoming] = useState(true);

  if (!isOpen || !lead) return null;

  const completedOutreach = mockOutreachHistory.filter(o => !o.isUpcoming);
  const upcomingOutreach = mockOutreachHistory.filter(o => o.isUpcoming);

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white border-l border-gray-200 shadow-xl z-50 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Lead Details</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Lead Info */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{lead.name}</h3>
            <p className="text-sm text-gray-600">{lead.title} at {lead.company}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Owner:</span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">
                  {lead.owner.avatar}
                </div>
                <span className="text-gray-900">{lead.owner.name}</span>
              </div>
            </div>
            <div>
              <span className="text-gray-500">SDR Agent:</span>
              <p className="text-gray-900 mt-1">{lead.sdrAgent}</p>
            </div>
          </div>

          {/* Overlap Warning */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-800">
                Multiple SDR Overlap Detected
              </span>
            </div>
            <p className="text-xs text-orange-700 mt-1">
              This lead is also being contacted by Agent B (Mike Chen)
            </p>
          </div>
        </div>
      </div>

      {/* Outreach Timeline */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-6 py-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Outreach Timeline</h3>
          
          {/* Upcoming Outreach */}
          {upcomingOutreach.length > 0 && (
            <div className="mb-6">
              <button
                onClick={() => setShowUpcoming(!showUpcoming)}
                className="flex items-center justify-between w-full mb-3 text-left"
              >
                <h4 className="text-sm font-medium text-gray-700">
                  Upcoming ({upcomingOutreach.length})
                </h4>
                <span className="text-xs text-gray-500">
                  {showUpcoming ? 'Hide' : 'Show'}
                </span>
              </button>
              
              {showUpcoming && (
                <div className="space-y-0">
                  {upcomingOutreach.map((outreach, index) => (
                    <OutreachItem
                      key={outreach.id}
                      outreach={outreach}
                      isLast={index === upcomingOutreach.length - 1}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Completed Outreach */}
          {completedOutreach.length > 0 && (
            <div>
              <button
                onClick={() => setShowCompleted(!showCompleted)}
                className="flex items-center justify-between w-full mb-3 text-left"
              >
                <h4 className="text-sm font-medium text-gray-700">
                  Completed ({completedOutreach.length})
                </h4>
                <span className="text-xs text-gray-500">
                  {showCompleted ? 'Hide' : 'Show'}
                </span>
              </button>
              
              {showCompleted && (
                <div className="space-y-0">
                  {completedOutreach.map((outreach, index) => (
                    <OutreachItem
                      key={outreach.id}
                      outreach={outreach}
                      isLast={index === completedOutreach.length - 1}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex space-x-3">
          <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
            Add Outreach
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
            Edit Lead
          </button>
        </div>
      </div>
    </div>
  );
}
