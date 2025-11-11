'use client';

import { Bell, Settings, User, Search } from 'lucide-react';

export default function Header({ userName = "Business Owner" }) {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good morning" : currentHour < 18 ? "Good afternoon" : "Good evening";

  return (
    <header className="glass sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Greeting */}
          <div>
            <h1 className="text-2xl font-bold text-white">
              {greeting}, <span className="text-ai-blue">{userName}</span>
            </h1>
            <p className="text-sm text-gray-400">Here's your business at a glance</p>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-dark-light rounded-lg px-4 py-2 w-96">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search anything..."
              className="bg-transparent outline-none text-white w-full"
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-dark-light transition-colors">
              <Bell className="w-6 h-6 text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-ai-emerald rounded-full"></span>
            </button>

            {/* Settings */}
            <button className="p-2 rounded-lg hover:bg-dark-light transition-colors">
              <Settings className="w-6 h-6 text-gray-300" />
            </button>

            {/* User Profile */}
            <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-dark-light transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-ai-blue to-ai-emerald flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
