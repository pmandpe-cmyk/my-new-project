import { Info } from 'lucide-react';
import { cn } from '../lib/utils';
import { kpiData } from '../lib/utils';

const KPICard = ({ title, count, leads, onClick, variant = 'default', tooltip }) => {
  const variants = {
    default: 'bg-white border-gray-200 hover:border-gray-300',
    warning: 'bg-orange-50 border-orange-200 hover:border-orange-300',
    success: 'bg-green-50 border-green-200 hover:border-green-300',
    info: 'bg-blue-50 border-blue-200 hover:border-blue-300'
  };

  return (
    <div 
      className={cn(
        'border rounded-xl p-4 cursor-pointer transition-all duration-200 hover:shadow-md group',
        variants[variant]
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
          {title}
        </h3>
        {tooltip && (
          <div className="relative group/tooltip">
            <Info className="h-4 w-4 text-gray-400" />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap z-10">
              {tooltip}
            </div>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <div className="text-2xl font-bold text-gray-900">
          {count.toLocaleString()}
        </div>
        <div className="text-sm text-gray-500">
          {leads.toLocaleString()} unique leads
        </div>
      </div>
    </div>
  );
};

const KPISection = ({ title, cards, variant }) => (
  <div className="space-y-3">
    <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <KPICard
          key={index}
          title={card.title}
          count={card.count}
          leads={card.leads}
          variant={card.variant || variant}
          tooltip={card.tooltip}
          onClick={() => console.log(`Filter by ${card.title}`)}
        />
      ))}
    </div>
  </div>
);

export default function KPICards() {
  const notStartedCards = [
    {
      title: 'Records Assigned',
      count: kpiData.notStarted.recordsAssigned.count,
      leads: kpiData.notStarted.recordsAssigned.leads,
      variant: 'info',
      tooltip: 'Total outreach records assigned vs unique leads'
    },
    {
      title: 'First Touch Scheduled',
      count: kpiData.notStarted.firstTouchScheduled.count,
      leads: kpiData.notStarted.firstTouchScheduled.leads,
      variant: 'info',
      tooltip: 'Outreach scheduled for first contact'
    },
    {
      title: 'Queue Backlog',
      count: kpiData.notStarted.queueBacklog.count,
      leads: kpiData.notStarted.queueBacklog.leads,
      variant: 'warning',
      tooltip: 'Outreach waiting to be sent'
    },
    {
      title: 'Needs Review',
      count: kpiData.notStarted.needsReview.count,
      leads: kpiData.notStarted.needsReview.leads,
      variant: 'warning',
      tooltip: 'Outreach requiring manual review'
    }
  ];

  const inProgressCards = [
    {
      title: 'Sent',
      count: kpiData.inProgress.sent.count,
      leads: kpiData.inProgress.sent.leads,
      tooltip: 'Outreach successfully sent'
    },
    {
      title: 'Waiting Reply',
      count: kpiData.inProgress.waitingReply.count,
      leads: kpiData.inProgress.waitingReply.leads,
      tooltip: 'Outreach sent, waiting for response'
    },
    {
      title: 'Paused',
      count: kpiData.inProgress.paused.count,
      leads: kpiData.inProgress.paused.leads,
      variant: 'warning',
      tooltip: 'Outreach temporarily paused'
    }
  ];

  const completedCards = [
    {
      title: 'Meeting Booked',
      count: kpiData.completed.meetingBooked.count,
      leads: kpiData.completed.meetingBooked.leads,
      variant: 'success',
      tooltip: 'Successful outreach - meetings scheduled'
    },
    {
      title: 'No Response',
      count: kpiData.completed.noResponse.count,
      leads: kpiData.completed.noResponse.leads,
      tooltip: 'Outreach completed without response'
    },
    {
      title: 'Opted Out',
      count: kpiData.completed.optedOut.count,
      leads: kpiData.completed.optedOut.leads,
      tooltip: 'Leads who opted out of outreach'
    },
    {
      title: 'Errors',
      count: kpiData.completed.errors.count,
      leads: kpiData.completed.errors.leads,
      variant: 'warning',
      tooltip: 'Outreach failed due to errors'
    }
  ];

  return (
    <div className="space-y-8">
      <KPISection
        title="Not Started"
        cards={notStartedCards}
        variant="info"
      />
      <KPISection
        title="In Progress"
        cards={inProgressCards}
        variant="default"
      />
      <KPISection
        title="Completed"
        cards={completedCards}
        variant="default"
      />
    </div>
  );
}
