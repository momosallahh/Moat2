'use client';

import { Bot, MessageSquare, Activity, TrendingUp } from 'lucide-react';

// Dummy AI staff data
const aiStaff = [
  {
    id: 1,
    name: "Sales Agent",
    role: "Lead Response & Follow-up",
    avatar: "📞",
    status: "active",
    tasksToday: 47,
    successRate: 92,
    currentTask: "Responding to 3 new leads",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    name: "Hiring Agent",
    role: "Applicant Screening",
    avatar: "👷",
    status: "active",
    tasksToday: 23,
    successRate: 87,
    currentTask: "Reviewing 5 applications",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    name: "Customer Care Agent",
    role: "Messages & Support",
    avatar: "💬",
    status: "active",
    tasksToday: 68,
    successRate: 95,
    currentTask: "Handling 2 customer inquiries",
    color: "from-emerald-500 to-green-500"
  },
  {
    id: 4,
    name: "Insights Agent",
    role: "Reports & Analytics",
    avatar: "📊",
    status: "idle",
    tasksToday: 12,
    successRate: 98,
    currentTask: "Preparing weekly report",
    color: "from-orange-500 to-red-500"
  },
  {
    id: 5,
    name: "Dispatch Agent",
    role: "Crew Coordination",
    avatar: "🚚",
    status: "paused",
    tasksToday: 0,
    successRate: 0,
    currentTask: "Awaiting activation",
    color: "from-gray-500 to-gray-600"
  },
  {
    id: 6,
    name: "Review Agent",
    role: "Review Collection",
    avatar: "⭐",
    status: "active",
    tasksToday: 34,
    successRate: 89,
    currentTask: "Sending review requests",
    color: "from-yellow-500 to-orange-500"
  }
];

function AgentCard({ agent }) {
  const isActive = agent.status === 'active';
  const isPaused = agent.status === 'paused';

  return (
    <div className="glass rounded-xl p-6 border border-white/10 card-hover">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-2xl`}>
            {agent.avatar}
          </div>
          <div>
            <h3 className="font-bold text-white">{agent.name}</h3>
            <p className="text-xs text-gray-400">{agent.role}</p>
          </div>
        </div>
        <div className={`w-3 h-3 rounded-full ${
          isActive ? 'bg-ai-emerald animate-pulse' :
          isPaused ? 'bg-yellow-500' :
          'bg-gray-500'
        }`}></div>
      </div>

      {/* Current Task */}
      <div className="mb-4 p-3 bg-dark-light/50 rounded-lg">
        <div className="flex items-start gap-2">
          <Activity className="w-4 h-4 text-ai-blue mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-xs text-gray-400 mb-1">Current Task</p>
            <p className="text-sm text-white">{agent.currentTask}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-400 mb-1">Tasks Today</p>
          <p className="text-2xl font-bold text-white">{agent.tasksToday}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">Success Rate</p>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-white">{agent.successRate}%</p>
            <TrendingUp className="w-4 h-4 text-ai-emerald" />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t border-white/10">
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-ai-blue/20 text-ai-blue hover:bg-ai-blue hover:text-white transition-all">
          <MessageSquare className="w-4 h-4" />
          <span className="text-sm font-semibold">Message</span>
        </button>
        <button className="flex-1 px-4 py-2 rounded-lg bg-dark-light text-gray-300 hover:bg-dark-light/80 transition-all">
          <span className="text-sm font-semibold">View Logs</span>
        </button>
      </div>
    </div>
  );
}

export default function AIStaffPanel() {
  const activeAgents = aiStaff.filter(a => a.status === 'active').length;
  const totalTasks = aiStaff.reduce((sum, agent) => sum + agent.tasksToday, 0);

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">AI Staff Panel</h2>
            <p className="text-gray-400">
              {activeAgents} agents active • {totalTasks} tasks completed today
            </p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-ai-blue to-ai-emerald text-white font-semibold hover:shadow-lg transition-all">
            + Add New Agent
          </button>
        </div>
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aiStaff.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}
