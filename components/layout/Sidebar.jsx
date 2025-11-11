'use client';

import { useState } from 'react';
import {
  LayoutDashboard,
  Bot,
  Workflow,
  BarChart3,
  Settings,
  Menu,
  X,
  Shield
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/', active: true },
  { icon: Shield, label: 'Moat Meter', href: '/moat-meter' },
  { icon: Workflow, label: 'Routine Manager', href: '/routines' },
  { icon: Bot, label: 'AI Staff', href: '/ai-staff' },
  { icon: BarChart3, label: 'Reports & Insights', href: '/reports' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-dark-light text-white"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen glass border-r border-white/10 transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 w-64`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-ai-blue to-ai-emerald flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Command</h2>
              <p className="text-xs text-gray-400">Center</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                item.active
                  ? 'bg-ai-blue text-white'
                  : 'text-gray-400 hover:bg-dark-light hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="glass rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-ai-emerald rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-400">AI Status</span>
            </div>
            <p className="text-xs text-ai-emerald font-semibold">All Systems Active</p>
          </div>
        </div>
      </aside>
    </>
  );
}
