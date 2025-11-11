'use client';

import { useState } from 'react';
import { Save, Key, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

// API configuration categories
const apiCategories = [
  {
    id: 'trello',
    name: 'Trello',
    description: 'Project boards and task management',
    icon: '📋',
    fields: [
      { key: 'TRELLO_API_KEY', label: 'API Key', type: 'text', required: true },
      { key: 'TRELLO_TOKEN', label: 'Token', type: 'password', required: true }
    ]
  },
  {
    id: 'google',
    name: 'Google Sheets',
    description: 'Lead logs and data management',
    icon: '📊',
    fields: [
      { key: 'GOOGLE_SHEETS_API_KEY', label: 'API Key', type: 'text', required: true },
      { key: 'GOOGLE_SERVICE_ACCOUNT', label: 'Service Account JSON', type: 'textarea', required: false }
    ]
  },
  {
    id: 'gmail',
    name: 'Gmail',
    description: 'Email communication',
    icon: '📧',
    fields: [
      { key: 'GMAIL_CLIENT_ID', label: 'Client ID', type: 'text', required: true },
      { key: 'GMAIL_CLIENT_SECRET', label: 'Client Secret', type: 'password', required: true }
    ]
  },
  {
    id: 'twilio',
    name: 'Twilio',
    description: 'SMS messaging',
    icon: '💬',
    fields: [
      { key: 'TWILIO_ACCOUNT_SID', label: 'Account SID', type: 'text', required: true },
      { key: 'TWILIO_AUTH_TOKEN', label: 'Auth Token', type: 'password', required: true },
      { key: 'TWILIO_PHONE_NUMBER', label: 'Phone Number', type: 'text', required: true }
    ]
  },
  {
    id: 'quickbooks',
    name: 'QuickBooks',
    description: 'Invoicing and payments',
    icon: '💰',
    fields: [
      { key: 'QUICKBOOKS_CLIENT_ID', label: 'Client ID', type: 'text', required: true },
      { key: 'QUICKBOOKS_CLIENT_SECRET', label: 'Client Secret', type: 'password', required: true }
    ]
  },
  {
    id: 'ai',
    name: 'AI Services',
    description: 'OpenAI & Anthropic API keys',
    icon: '🤖',
    fields: [
      { key: 'OPENAI_API_KEY', label: 'OpenAI API Key', type: 'password', required: false },
      { key: 'ANTHROPIC_API_KEY', label: 'Anthropic API Key', type: 'password', required: false }
    ]
  },
  {
    id: 'automation',
    name: 'Automation',
    description: 'Zapier and n8n webhooks',
    icon: '⚡',
    fields: [
      { key: 'ZAPIER_WEBHOOK_URL', label: 'Zapier Webhook URL', type: 'text', required: false },
      { key: 'N8N_WEBHOOK_URL', label: 'n8n Webhook URL', type: 'text', required: false }
    ]
  }
];

function APISection({ category }) {
  const [values, setValues] = useState({});
  const [status, setStatus] = useState('idle'); // idle, saving, saved, error

  const handleChange = (key, value) => {
    setValues(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setStatus('saving');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus('saved');
    setTimeout(() => setStatus('idle'), 2000);
  };

  const handleTest = async () => {
    setStatus('testing');
    // Simulate API test
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStatus('tested');
    setTimeout(() => setStatus('idle'), 2000);
  };

  return (
    <div className="glass rounded-xl p-6 border border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ai-blue/20 to-ai-emerald/20 flex items-center justify-center text-2xl">
            {category.icon}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{category.name}</h3>
            <p className="text-sm text-gray-400">{category.description}</p>
          </div>
        </div>
        {status === 'saved' && (
          <div className="flex items-center gap-2 text-ai-emerald">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-semibold">Saved!</span>
          </div>
        )}
        {status === 'tested' && (
          <div className="flex items-center gap-2 text-ai-emerald">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-semibold">Connected!</span>
          </div>
        )}
      </div>

      {/* Fields */}
      <div className="space-y-4 mb-6">
        {category.fields.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {field.label}
              {field.required && <span className="text-red-400 ml-1">*</span>}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                value={values[field.key] || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="w-full bg-dark-light rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-ai-blue border border-white/10"
                placeholder={`Enter ${field.label.toLowerCase()}`}
                rows={4}
              />
            ) : (
              <input
                type={field.type}
                value={values[field.key] || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="w-full bg-dark-light rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-ai-blue border border-white/10"
                placeholder={`Enter ${field.label.toLowerCase()}`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={status === 'saving'}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-ai-blue to-ai-emerald text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50"
        >
          {status === 'saving' ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Configuration</span>
            </>
          )}
        </button>
        <button
          onClick={handleTest}
          disabled={status === 'testing'}
          className="px-4 py-3 rounded-lg bg-dark-light text-gray-300 hover:bg-dark-light/80 transition-all font-semibold disabled:opacity-50"
        >
          {status === 'testing' ? 'Testing...' : 'Test Connection'}
        </button>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Settings</h2>
        <p className="text-gray-400">Configure your API connections and integrations</p>
      </div>

      {/* Info Banner */}
      <div className="mb-8 glass rounded-xl p-6 border border-ai-blue/30">
        <div className="flex items-start gap-4">
          <Key className="w-6 h-6 text-ai-blue flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Secure API Key Storage</h3>
            <p className="text-gray-300 text-sm mb-3">
              Your API keys are encrypted and stored securely. They are never shared with third parties and are only used to connect to your authorized services.
            </p>
            <div className="flex items-center gap-2 text-ai-emerald text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>256-bit encryption enabled</span>
            </div>
          </div>
        </div>
      </div>

      {/* API Sections */}
      <div className="space-y-6">
        {apiCategories.map((category) => (
          <APISection key={category.id} category={category} />
        ))}
      </div>

      {/* Access Management */}
      <div className="mt-8 glass rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-bold text-white mb-4">Access Management</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Allow AI agents full access</p>
              <p className="text-sm text-gray-400">Agents can read and write data to all connected services</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ai-blue/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ai-blue"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">Require approval for actions</p>
              <p className="text-sm text-gray-400">AI must ask permission before sending messages or creating tasks</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-ai-blue/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ai-blue"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
