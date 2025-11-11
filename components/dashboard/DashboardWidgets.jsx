'use client';

import {
  Users,
  DollarSign,
  CheckSquare,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Clock
} from 'lucide-react';

// Dummy data
const widgetData = [
  {
    id: 1,
    title: "Leads This Week",
    value: "47",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
    data: "23 from Google, 15 from referrals, 9 organic",
    source: "Google Sheets"
  },
  {
    id: 2,
    title: "Pending Invoices",
    value: "$8,450",
    change: "5 unpaid",
    trend: "neutral",
    icon: DollarSign,
    color: "from-emerald-500 to-green-500",
    data: "Total: $12,800 | Paid: $4,350",
    source: "QuickBooks"
  },
  {
    id: 3,
    title: "Open Tasks",
    value: "23",
    change: "-3 from yesterday",
    trend: "up",
    icon: CheckSquare,
    color: "from-purple-500 to-pink-500",
    data: "8 urgent, 15 normal priority",
    source: "Trello"
  },
  {
    id: 4,
    title: "Scheduled Messages",
    value: "15",
    change: "Next in 2hrs",
    trend: "neutral",
    icon: MessageSquare,
    color: "from-orange-500 to-red-500",
    data: "12 SMS, 3 email follow-ups",
    source: "Twilio"
  }
];

function Widget({ widget }) {
  const Icon = widget.icon;
  const isPositive = widget.trend === "up";

  return (
    <div className="glass rounded-xl p-6 border border-white/10 card-hover">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm text-gray-400 mb-1">{widget.title}</p>
          <h3 className="text-3xl font-bold text-white">{widget.value}</h3>
        </div>
        <div className={`p-3 rounded-lg bg-gradient-to-br ${widget.color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Change indicator */}
      <div className="flex items-center gap-2 mb-3">
        {widget.trend === "up" ? (
          <TrendingUp className={`w-4 h-4 ${isPositive ? 'text-ai-emerald' : 'text-red-400'}`} />
        ) : widget.trend === "down" ? (
          <TrendingDown className="w-4 h-4 text-red-400" />
        ) : (
          <Clock className="w-4 h-4 text-gray-400" />
        )}
        <span className={`text-sm font-medium ${
          widget.trend === "up" && isPositive ? 'text-ai-emerald' :
          widget.trend === "down" ? 'text-red-400' :
          'text-gray-400'
        }`}>
          {widget.change}
        </span>
      </div>

      {/* Additional data */}
      <p className="text-xs text-gray-400 mb-2">{widget.data}</p>

      {/* Source badge */}
      <div className="flex items-center justify-between pt-3 border-t border-white/10">
        <span className="text-xs text-gray-500">Source: {widget.source}</span>
        <button className="text-xs text-ai-blue hover:text-ai-emerald font-medium">
          View Details →
        </button>
      </div>
    </div>
  );
}

export default function DashboardWidgets() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {widgetData.map((widget) => (
        <Widget key={widget.id} widget={widget} />
      ))}
    </div>
  );
}
