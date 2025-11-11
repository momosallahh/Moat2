'use client';

import { Workflow, Play, Pause, Settings, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

// Dummy routine data
const routines = [
  {
    id: 1,
    name: "Sales Routine",
    description: "Auto-respond to leads 24/7",
    status: "active",
    progress: 85,
    activeZaps: 3,
    tasksCompleted: 247,
    lastRun: "2 minutes ago",
    aiAgent: "Sales Agent",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    name: "Hiring Routine",
    description: "Screen applicants automatically",
    status: "active",
    progress: 70,
    activeZaps: 2,
    tasksCompleted: 89,
    lastRun: "15 minutes ago",
    aiAgent: "Hiring Agent",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    name: "Dispatch Routine",
    description: "Coordinate crews and schedules",
    status: "paused",
    progress: 45,
    activeZaps: 4,
    tasksCompleted: 156,
    lastRun: "3 hours ago",
    aiAgent: "Dispatch Agent",
    color: "from-orange-500 to-red-500"
  },
  {
    id: 4,
    name: "Review Collection",
    description: "Request Google reviews at perfect timing",
    status: "active",
    progress: 92,
    activeZaps: 2,
    tasksCompleted: 312,
    lastRun: "5 minutes ago",
    aiAgent: "Customer Care Agent",
    color: "from-emerald-500 to-green-500"
  },
  {
    id: 5,
    name: "Follow-up Routine",
    description: "Message leads marked for follow-up",
    status: "active",
    progress: 78,
    activeZaps: 3,
    tasksCompleted: 198,
    lastRun: "12 minutes ago",
    aiAgent: "Sales Agent",
    color: "from-yellow-500 to-orange-500"
  },
  {
    id: 6,
    name: "Invoice Reminder",
    description: "Send payment reminders automatically",
    status: "inactive",
    progress: 0,
    activeZaps: 0,
    tasksCompleted: 0,
    lastRun: "Never",
    aiAgent: "None",
    color: "from-gray-500 to-gray-600"
  }
];

function RoutineCard({ routine }) {
  const isActive = routine.status === 'active';
  const isPaused = routine.status === 'paused';

  return (
    <div className="glass rounded-xl p-6 border border-white/10 card-hover">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${routine.color} flex items-center justify-center`}>
              <Workflow className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white">{routine.name}</h3>
              <p className="text-xs text-gray-400">{routine.description}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isActive ? (
            <div className="px-2 py-1 rounded-full bg-ai-emerald/20 text-ai-emerald text-xs font-semibold flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Active
            </div>
          ) : isPaused ? (
            <div className="px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-500 text-xs font-semibold flex items-center gap-1">
              <Pause className="w-3 h-3" />
              Paused
            </div>
          ) : (
            <div className="px-2 py-1 rounded-full bg-gray-500/20 text-gray-400 text-xs font-semibold flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Inactive
            </div>
          )}
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-gray-400">Progress</span>
          <span className="text-white font-semibold">{routine.progress}%</span>
        </div>
        <div className="h-2 bg-dark-light rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${routine.color} transition-all duration-500`}
            style={{ width: `${routine.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-400">Active Zaps</p>
          <p className="text-lg font-bold text-white">{routine.activeZaps}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Tasks Done</p>
          <p className="text-lg font-bold text-white">{routine.tasksCompleted}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Last Run</p>
          <p className="text-xs font-semibold text-ai-blue">{routine.lastRun}</p>
        </div>
      </div>

      {/* AI Agent */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-ai-blue to-ai-emerald flex items-center justify-center text-xs font-bold text-white">
            AI
          </div>
          <span className="text-xs text-gray-400">{routine.aiAgent}</span>
        </div>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg hover:bg-dark-light transition-colors">
            {isActive ? (
              <Pause className="w-4 h-4 text-gray-400" />
            ) : (
              <Play className="w-4 h-4 text-ai-emerald" />
            )}
          </button>
          <button className="p-2 rounded-lg hover:bg-dark-light transition-colors">
            <Settings className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RoutineManager() {
  const activeRoutines = routines.filter(r => r.status === 'active').length;
  const totalRoutines = routines.length;

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Routine Manager</h2>
            <p className="text-gray-400">
              {activeRoutines} of {totalRoutines} routines active
            </p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-ai-blue to-ai-emerald text-white font-semibold hover:shadow-lg transition-all">
            + Add New Routine
          </button>
        </div>
      </div>

      {/* Routines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {routines.map((routine) => (
          <RoutineCard key={routine.id} routine={routine} />
        ))}
      </div>
    </div>
  );
}
