'use client';

import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Download, Calendar, TrendingUp, DollarSign, Users, CheckSquare } from 'lucide-react';

// Dummy chart data
const leadsData = [
  { name: 'Mon', leads: 12, conversions: 5 },
  { name: 'Tue', leads: 19, conversions: 8 },
  { name: 'Wed', leads: 15, conversions: 6 },
  { name: 'Thu', leads: 22, conversions: 10 },
  { name: 'Fri', leads: 28, conversions: 12 },
  { name: 'Sat', leads: 18, conversions: 7 },
  { name: 'Sun', leads: 14, conversions: 5 }
];

const revenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 70000 },
  { month: 'Jun', revenue: 68000 }
];

const leadSourceData = [
  { name: 'Google Ads', value: 35, color: '#00AEEF' },
  { name: 'Referrals', value: 28, color: '#00E6A8' },
  { name: 'Organic', value: 20, color: '#EFBF45' },
  { name: 'Social Media', value: 12, color: '#8B5CF6' },
  { name: 'Other', value: 5, color: '#6B7280' }
];

const taskCompletionData = [
  { week: 'Week 1', completed: 45, pending: 12 },
  { week: 'Week 2', completed: 52, pending: 8 },
  { week: 'Week 3', completed: 48, pending: 15 },
  { week: 'Week 4', completed: 61, pending: 9 }
];

const summaryStats = [
  {
    label: "Total Revenue",
    value: "$344K",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "from-emerald-500 to-green-500"
  },
  {
    label: "New Leads",
    value: "128",
    change: "+8.3%",
    trend: "up",
    icon: Users,
    color: "from-blue-500 to-cyan-500"
  },
  {
    label: "Tasks Completed",
    value: "206",
    change: "+5.1%",
    trend: "up",
    icon: CheckSquare,
    color: "from-purple-500 to-pink-500"
  },
  {
    label: "Conversion Rate",
    value: "42%",
    change: "-2.1%",
    trend: "down",
    icon: TrendingUp,
    color: "from-orange-500 to-red-500"
  }
];

function SummaryCard({ stat }) {
  const Icon = stat.icon;
  const isPositive = stat.trend === 'up';

  return (
    <div className="glass rounded-xl p-6 border border-white/10">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
          <p className="text-3xl font-bold text-white">{stat.value}</p>
        </div>
        <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <TrendingUp className={`w-4 h-4 ${isPositive ? 'text-ai-emerald' : 'text-red-400 rotate-180'}`} />
        <span className={`text-sm font-medium ${isPositive ? 'text-ai-emerald' : 'text-red-400'}`}>
          {stat.change}
        </span>
        <span className="text-sm text-gray-400">vs last month</span>
      </div>
    </div>
  );
}

export default function ReportsInsights() {
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Reports & Insights</h2>
            <p className="text-gray-400">AI-powered analytics for your business</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-dark-light text-gray-300 hover:bg-dark-light/80 transition-all">
              <Calendar className="w-4 h-4" />
              <span>Last 30 Days</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-ai-blue to-ai-emerald text-white font-semibold hover:shadow-lg transition-all">
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryStats.map((stat, index) => (
          <SummaryCard key={index} stat={stat} />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Leads & Conversions */}
        <div className="glass rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-bold text-white mb-4">Leads & Conversions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={leadsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1f2e',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="leads" fill="#00AEEF" radius={[8, 8, 0, 0]} />
              <Bar dataKey="conversions" fill="#00E6A8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Trend */}
        <div className="glass rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-bold text-white mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1f2e',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px'
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#00E6A8"
                strokeWidth={3}
                dot={{ fill: '#00E6A8', r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Sources */}
        <div className="glass rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-bold text-white mb-4">Lead Sources</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={leadSourceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {leadSourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1f2e',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Task Completion */}
        <div className="glass rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-bold text-white mb-4">Task Completion</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskCompletionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="week" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1f2e',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="completed" stackId="a" fill="#00E6A8" radius={[8, 8, 0, 0]} />
              <Bar dataKey="pending" stackId="a" fill="#EFBF45" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Insights Box */}
      <div className="mt-6 glass rounded-xl p-6 border border-ai-blue/30">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-ai-blue to-ai-emerald flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-2">🤖 AI Insights</h3>
            <div className="space-y-2">
              <p className="text-gray-300">
                • Your lead conversion rate increased by 8.3% this week. The Sales Agent is performing exceptionally well with Google Ads leads.
              </p>
              <p className="text-gray-300">
                • Consider activating the Dispatch Routine - you have 15 pending crew assignments that could be automated.
              </p>
              <p className="text-gray-300">
                • Revenue is trending upward. Projecting $75K for next month if current pace continues.
              </p>
            </div>
            <button className="mt-4 px-4 py-2 rounded-lg bg-ai-blue text-white font-semibold hover:bg-ai-emerald transition-colors">
              View Detailed Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
