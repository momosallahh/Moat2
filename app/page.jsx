'use client';

import MainLayout from '@/components/layout/MainLayout';
import MoatMeter from '@/components/dashboard/MoatMeter';
import DashboardWidgets from '@/components/dashboard/DashboardWidgets';
import AIChatInterface from '@/components/ai-chat/AIChatInterface';

export default function HomePage() {
  return (
    <MainLayout userName="Alex">
      {/* Company Overview Section */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Company Overview</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Moat Meter - takes 1 column */}
          <div className="lg:col-span-1">
            <MoatMeter
              routinesCount={4}
              totalRoutines={10}
              aiAgentsCount={4}
              totalAgents={6}
            />
          </div>

          {/* Quick Stats - takes 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Business Health Indicators */}
            <div className="glass rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">Business Health Indicators</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-dark-light/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Lead Response Time</p>
                  <p className="text-2xl font-bold text-ai-emerald">2.3 min</p>
                  <p className="text-xs text-ai-emerald">↑ 45% faster</p>
                </div>
                <div className="bg-dark-light/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Customer Satisfaction</p>
                  <p className="text-2xl font-bold text-ai-emerald">4.8/5.0</p>
                  <p className="text-xs text-ai-emerald">↑ 0.3 points</p>
                </div>
                <div className="bg-dark-light/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Automation Rate</p>
                  <p className="text-2xl font-bold text-ai-blue">68%</p>
                  <p className="text-xs text-ai-blue">↑ 12% this month</p>
                </div>
                <div className="bg-dark-light/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-1">Time Saved/Week</p>
                  <p className="text-2xl font-bold text-ai-gold">14.5 hrs</p>
                  <p className="text-xs text-ai-gold">Worth $580</p>
                </div>
              </div>
            </div>

            {/* AI Activity Feed */}
            <div className="glass rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">Recent AI Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-ai-emerald rounded-full"></div>
                  <span className="text-gray-400">Sales Agent</span>
                  <span className="text-white">responded to 3 new leads</span>
                  <span className="text-gray-500 ml-auto text-xs">2 min ago</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-ai-blue rounded-full"></div>
                  <span className="text-gray-400">Customer Care</span>
                  <span className="text-white">sent 12 review requests</span>
                  <span className="text-gray-500 ml-auto text-xs">15 min ago</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-ai-gold rounded-full"></div>
                  <span className="text-gray-400">Hiring Agent</span>
                  <span className="text-white">screened 5 applications</span>
                  <span className="text-gray-500 ml-auto text-xs">1 hr ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Widgets */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Business Metrics</h2>
        <DashboardWidgets />
      </section>

      {/* Quick Actions */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="glass rounded-xl p-6 border border-white/10 hover:border-ai-blue/50 transition-all group">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-bold text-white mb-1 group-hover:text-ai-blue transition-colors">View Reports</h3>
            <p className="text-sm text-gray-400">Weekly analytics</p>
          </button>
          <button className="glass rounded-xl p-6 border border-white/10 hover:border-ai-blue/50 transition-all group">
            <div className="text-3xl mb-3">📝</div>
            <h3 className="font-bold text-white mb-1 group-hover:text-ai-blue transition-colors">Create Quote</h3>
            <p className="text-sm text-gray-400">Send to customer</p>
          </button>
          <button className="glass rounded-xl p-6 border border-white/10 hover:border-ai-blue/50 transition-all group">
            <div className="text-3xl mb-3">📋</div>
            <h3 className="font-bold text-white mb-1 group-hover:text-ai-blue transition-colors">Add Task</h3>
            <p className="text-sm text-gray-400">To any board</p>
          </button>
          <button className="glass rounded-xl p-6 border border-white/10 hover:border-ai-blue/50 transition-all group">
            <div className="text-3xl mb-3">👥</div>
            <h3 className="font-bold text-white mb-1 group-hover:text-ai-blue transition-colors">View Jobs</h3>
            <p className="text-sm text-gray-400">Today's schedule</p>
          </button>
        </div>
      </section>

      {/* AI Assistant Suggestions */}
      <section>
        <div className="glass rounded-xl p-6 border border-ai-blue/30">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-ai-blue to-ai-emerald flex items-center justify-center text-2xl flex-shrink-0">
              💡
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-2">AI Recommendations</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-ai-emerald">•</span>
                  <span>You have 8 leads that haven't been contacted in 48 hours. Would you like me to send follow-up messages?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ai-blue">•</span>
                  <span>Your Google Ads conversion rate dropped 5% this week. I recommend adjusting your ad copy.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ai-gold">•</span>
                  <span>Consider activating the Dispatch Routine - it would save you 6 hours per week on crew coordination.</span>
                </li>
              </ul>
              <button className="mt-4 px-4 py-2 rounded-lg bg-ai-blue text-white font-semibold hover:bg-ai-emerald transition-colors">
                Take Action
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Chat Interface - Floating */}
      <AIChatInterface />
    </MainLayout>
  );
}
