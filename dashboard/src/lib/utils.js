import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Mock data for the dashboard
export const mockLeads = [
  {
    id: 1,
    name: "John Smith",
    title: "VP of Sales",
    company: "TechCorp Inc",
    owner: { name: "Sarah Johnson", avatar: "SJ" },
    sdrAgent: "Agent A",
    outreachSummary: { sent: 3, queued: 1, errors: 0 },
    lastOutreach: { type: "email", date: "2024-01-15" },
    nextOutreach: { type: "linkedin", date: "2024-01-20" },
    status: "In Progress"
  },
  {
    id: 2,
    name: "Emily Davis",
    title: "Marketing Director",
    company: "GrowthLabs",
    owner: { name: "Mike Chen", avatar: "MC" },
    sdrAgent: "Agent B",
    outreachSummary: { sent: 5, queued: 0, errors: 1 },
    lastOutreach: { type: "email", date: "2024-01-14" },
    nextOutreach: { type: "phone", date: "2024-01-19" },
    status: "Needs Review"
  },
  {
    id: 3,
    name: "Robert Wilson",
    title: "CTO",
    company: "InnovateTech",
    owner: { name: "Lisa Park", avatar: "LP" },
    sdrAgent: "Agent C",
    outreachSummary: { sent: 2, queued: 2, errors: 0 },
    lastOutreach: { type: "linkedin", date: "2024-01-13" },
    nextOutreach: { type: "email", date: "2024-01-18" },
    status: "First Touch Scheduled"
  },
  {
    id: 4,
    name: "Amanda Thompson",
    title: "Head of Operations",
    company: "ScaleUp Solutions",
    owner: { name: "David Kim", avatar: "DK" },
    sdrAgent: "Agent A",
    outreachSummary: { sent: 4, queued: 0, errors: 0 },
    lastOutreach: { type: "phone", date: "2024-01-12" },
    nextOutreach: { type: "email", date: "2024-01-22" },
    status: "Meeting Booked"
  }
];

export const kpiData = {
  notStarted: {
    recordsAssigned: { count: 45, leads: 35 },
    firstTouchScheduled: { count: 23, leads: 18 },
    queueBacklog: { count: 12, leads: 12 },
    needsReview: { count: 8, leads: 7 }
  },
  inProgress: {
    sent: { count: 156, leads: 89 },
    waitingReply: { count: 67, leads: 52 },
    paused: { count: 15, leads: 12 }
  },
  completed: {
    meetingBooked: { count: 34, leads: 28 },
    noResponse: { count: 78, leads: 65 },
    optedOut: { count: 12, leads: 12 },
    errors: { count: 9, leads: 8 }
  }
};
