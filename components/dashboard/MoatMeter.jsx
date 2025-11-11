'use client';

import { Shield, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

export default function MoatMeter({
  routinesCount = 3,
  totalRoutines = 10,
  aiAgentsCount = 4,
  totalAgents = 6
}) {
  // Calculate overall protection score (0-100)
  const routineScore = (routinesCount / totalRoutines) * 50;
  const agentScore = (aiAgentsCount / totalAgents) * 50;
  const totalScore = Math.round(routineScore + agentScore);

  // Determine protection level
  let level, color, bgColor, icon, message;

  if (totalScore >= 80) {
    level = "FORTRESS";
    color = "text-ai-emerald";
    bgColor = "from-emerald-500/20 to-emerald-500/5";
    icon = <CheckCircle className="w-8 h-8 text-ai-emerald" />;
    message = "Your business is exceptionally protected!";
  } else if (totalScore >= 60) {
    level = "STRONG";
    color = "text-blue-400";
    bgColor = "from-blue-500/20 to-blue-500/5";
    icon = <TrendingUp className="w-8 h-8 text-blue-400" />;
    message = "Good protection. A few more routines will make you unbeatable.";
  } else if (totalScore >= 40) {
    level = "MODERATE";
    color = "text-ai-gold";
    bgColor = "from-yellow-500/20 to-yellow-500/5";
    icon = <Shield className="w-8 h-8 text-ai-gold" />;
    message = "You have some defenses, but gaps exist.";
  } else {
    level = "VULNERABLE";
    color = "text-red-400";
    bgColor = "from-red-500/20 to-red-500/5";
    icon = <AlertTriangle className="w-8 h-8 text-red-400" />;
    message = "Critical: Your business needs immediate protection!";
  }

  return (
    <div className="glass rounded-2xl p-6 border border-white/10 card-hover">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-ai-blue/20 to-ai-emerald/20">
            <Shield className="w-6 h-6 text-ai-blue" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Moat Meter™</h3>
            <p className="text-sm text-gray-400">Business Protection Score</p>
          </div>
        </div>
        {icon}
      </div>

      {/* Score Circle */}
      <div className="relative flex items-center justify-center mb-6">
        <svg className="w-48 h-48 transform -rotate-90">
          {/* Background Circle */}
          <circle
            cx="96"
            cy="96"
            r="80"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="12"
            fill="none"
          />
          {/* Progress Circle */}
          <circle
            cx="96"
            cy="96"
            r="80"
            stroke={totalScore >= 80 ? '#00E6A8' : totalScore >= 60 ? '#00AEEF' : totalScore >= 40 ? '#EFBF45' : '#ef4444'}
            strokeWidth="12"
            fill="none"
            strokeDasharray={`${(totalScore / 100) * 502.4} 502.4`}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`text-5xl font-bold ${color}`}>
            {totalScore}
          </div>
          <div className="text-sm text-gray-400 mt-1">/ 100</div>
        </div>
      </div>

      {/* Status Badge */}
      <div className={`text-center mb-4 p-3 rounded-lg bg-gradient-to-r ${bgColor}`}>
        <div className={`text-xl font-bold ${color}`}>{level}</div>
        <p className="text-sm text-gray-300 mt-1">{message}</p>
      </div>

      {/* Breakdown */}
      <div className="space-y-4">
        {/* Routines */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Active Routines</span>
            <span className="text-white font-semibold">{routinesCount} / {totalRoutines}</span>
          </div>
          <div className="h-2 bg-dark-light rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-ai-blue to-ai-emerald transition-all duration-500"
              style={{ width: `${(routinesCount / totalRoutines) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* AI Agents */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">AI Agents Deployed</span>
            <span className="text-white font-semibold">{aiAgentsCount} / {totalAgents}</span>
          </div>
          <div className="h-2 bg-dark-light rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-ai-emerald to-ai-gold transition-all duration-500"
              style={{ width: `${(aiAgentsCount / totalAgents) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* CTA */}
      {totalScore < 80 && (
        <button className="w-full mt-6 py-3 px-4 rounded-lg bg-gradient-to-r from-ai-blue to-ai-emerald text-white font-semibold hover:shadow-lg hover:shadow-ai-blue/50 transition-all">
          Add More Protection
        </button>
      )}
    </div>
  );
}
