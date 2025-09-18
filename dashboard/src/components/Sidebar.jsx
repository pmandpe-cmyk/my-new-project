import { Home, Users, MessageSquare, BarChart3, Calendar, Settings, Filter } from 'lucide-react';
import { cn } from '../lib/utils';

const navigationItems = [
  { name: 'Dashboard', icon: Home, current: true },
  { name: 'Leads', icon: Users, current: false },
  { name: 'Outreach', icon: MessageSquare, current: false },
  { name: 'Analytics', icon: BarChart3, current: false },
  { name: 'Calendar', icon: Calendar, current: false },
  { name: 'Settings', icon: Settings, current: false },
];

const filterSections = [
  {
    title: 'Status',
    options: ['All Leads', 'Active', 'Paused', 'Completed']
  },
  {
    title: 'Owner',
    options: ['All Owners', 'Sarah Johnson', 'Mike Chen', 'Lisa Park', 'David Kim']
  },
  {
    title: 'Channel',
    options: ['All Channels', 'Email', 'LinkedIn', 'Phone', 'Direct Mail']
  }
];

export default function Sidebar() {
  return (
    <div className="w-72 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        <div className="mb-8">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Navigation
          </h2>
          {navigationItems.map((item) => (
            <a
              key={item.name}
              href="#"
              className={cn(
                'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                item.current
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5 flex-shrink-0',
                  item.current ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                )}
              />
              {item.name}
            </a>
          ))}
        </div>

        {/* Filters Section */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Filters
            </h2>
            <Filter className="h-4 w-4 text-gray-400" />
          </div>
          
          {filterSections.map((section) => (
            <div key={section.title} className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.options.map((option, index) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name={section.title.toLowerCase()}
                      defaultChecked={index === 0}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-blue-50 rounded-lg p-3">
          <h4 className="text-sm font-medium text-blue-900 mb-1">
            Quick Stats
          </h4>
          <div className="text-xs text-blue-700">
            <div className="flex justify-between mb-1">
              <span>Active Campaigns:</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex justify-between">
              <span>This Week's Outreach:</span>
              <span className="font-medium">234</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
