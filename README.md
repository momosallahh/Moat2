# Business Command Center 🏢

**The first AI-powered dashboard where small business owners can "talk" to their business.**

A no-code SaaS-style web app that allows business owners to manage daily operations, reports, communication, and AI routines from a single interface. Connects to Trello, Google Sheets, Gmail, Twilio, and QuickBooks via API.

![Business Command Center](https://img.shields.io/badge/Status-Beta-blue) ![Next.js](https://img.shields.io/badge/Next.js-16.0-black) ![React](https://img.shields.io/badge/React-19.2-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-4.0-cyan)

---

## 🎯 Purpose

Allow business owners to:
- Manage daily operations from one dashboard
- Ask natural-language questions to AI
- Automate routine tasks with AI agents
- Track business health with the **Moat Meter™**
- Execute commands via voice or text

---

## ✨ Key Features

### 1. **Company Overview / Moat Meter™**
Visual indicator showing how protected your business is based on:
- Number of active AI routines (out of 10)
- Number of AI agents deployed (out of 6)
- Overall business health score (0-100)

Protection levels:
- 🏰 **FORTRESS** (80-100): Exceptionally protected
- 💪 **STRONG** (60-79): Good protection
- ⚠️ **MODERATE** (40-59): Some gaps exist
- 🚨 **VULNERABLE** (0-39): Critical protection needed

### 2. **Dashboard Widgets**
Real-time metrics from integrated services:
- **Leads This Week** (Google Sheets)
- **Pending Invoices** (QuickBooks)
- **Open Tasks** (Trello)
- **Scheduled Messages** (Twilio)

### 3. **AI Command Chat Interface**
Floating chat bubble that interprets commands like:
- "Show me leads by source for this week"
- "Message all leads marked 'follow-up'"
- "How many hours did my crew work yesterday?"
- "Summarize today's jobs"

Command types:
- **Data Summary**: Read and display data
- **Action**: Trigger automations or API calls
- **Planning**: Create tasks or reminders

### 4. **Routine Manager**
Visual grid of automation workflows:
- Sales Routine
- Hiring Routine
- Dispatch Routine
- Review Collection
- Follow-up Routine
- Invoice Reminder

Each routine shows:
- Current progress
- Active automations (Zaps)
- Assigned AI agents
- Last run time

### 5. **AI Staff Panel**
Team of specialized AI agents:
- 📞 **Sales Agent** - Lead response & follow-up
- 👷 **Hiring Agent** - Applicant screening
- 💬 **Customer Care Agent** - Messages & support
- 📊 **Insights Agent** - Reports & analytics
- 🚚 **Dispatch Agent** - Crew coordination
- ⭐ **Review Agent** - Review collection

Each agent displays:
- Current task
- Tasks completed today
- Success rate
- Status (active/idle/paused)

### 6. **Reports & Insights**
AI-powered analytics with charts:
- Leads & Conversions (Bar Chart)
- Revenue Trend (Line Chart)
- Lead Sources (Pie Chart)
- Task Completion (Stacked Bar)
- AI-generated insights and recommendations

### 7. **Settings**
Configure API connections:
- Trello (API Key, Token)
- Google Sheets (API Key, Service Account)
- Gmail (Client ID, Secret)
- Twilio (Account SID, Auth Token, Phone)
- QuickBooks (Client ID, Secret)
- AI Services (OpenAI, Anthropic)
- Automation (Zapier, n8n)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/business-command-center.git
cd business-command-center
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Copy `.env.local` and add your API keys:

```env
# API Keys
NEXT_PUBLIC_TRELLO_API_KEY=your_trello_api_key
NEXT_PUBLIC_TRELLO_TOKEN=your_trello_token
NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY=your_google_sheets_key
NEXT_PUBLIC_GMAIL_CLIENT_ID=your_gmail_client_id
NEXT_PUBLIC_GMAIL_CLIENT_SECRET=your_gmail_secret
NEXT_PUBLIC_TWILIO_ACCOUNT_SID=your_twilio_sid
NEXT_PUBLIC_TWILIO_AUTH_TOKEN=your_twilio_token
NEXT_PUBLIC_QUICKBOOKS_CLIENT_ID=your_quickbooks_id
NEXT_PUBLIC_QUICKBOOKS_CLIENT_SECRET=your_quickbooks_secret

# AI API Keys
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_key
NEXT_PUBLIC_ANTHROPIC_API_KEY=your_anthropic_key

# Automation
NEXT_PUBLIC_ZAPIER_WEBHOOK_URL=your_zapier_webhook
NEXT_PUBLIC_N8N_WEBHOOK_URL=your_n8n_webhook
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
```
http://localhost:3000
```

---

## 🎨 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts
- **Icons**: Lucide React
- **Fonts**: Poppins (headings), Inter (body)

### Color Palette
- Background: `#0B0F14` (dark matte)
- Accent Blue: `#00AEEF` (AI blue)
- Accent Emerald: `#00E6A8` (success glow)
- Accent Gold: `#EFBF45` (premium highlights)

---

## 📁 Project Structure

```
business-command-center/
├── app/
│   ├── layout.jsx          # Root layout
│   ├── page.jsx            # Homepage/Dashboard
│   └── globals.css         # Global styles
├── components/
│   ├── layout/
│   │   ├── Header.jsx      # Top navigation bar
│   │   ├── Sidebar.jsx     # Side navigation
│   │   └── MainLayout.jsx  # Main layout wrapper
│   ├── dashboard/
│   │   ├── MoatMeter.jsx   # Company health indicator
│   │   └── DashboardWidgets.jsx  # Metric cards
│   ├── ai-chat/
│   │   └── AIChatInterface.jsx   # Floating AI chat
│   ├── routine-manager/
│   │   └── RoutineManager.jsx    # Automation workflows
│   ├── ai-staff/
│   │   └── AIStaffPanel.jsx      # AI agent cards
│   ├── reports/
│   │   └── ReportsInsights.jsx   # Charts & analytics
│   └── settings/
│       └── SettingsPage.jsx      # API configuration
├── lib/
│   ├── apiHooks.js         # API integration functions
│   └── aiCommandProcessor.js     # AI command logic
├── .env.local              # Environment variables
├── tailwind.config.js      # Tailwind configuration
├── next.config.js          # Next.js configuration
└── package.json            # Dependencies
```

---

## 🔌 API Integrations

### Current Integrations
All API functions are in `lib/apiHooks.js`:

- **Trello**: Get boards, tasks; create tasks
- **Google Sheets**: Get leads; add leads
- **Gmail**: Get messages; send emails
- **Twilio**: Get SMS; send/schedule messages
- **QuickBooks**: Get invoices; create invoices
- **Zapier/n8n**: Trigger automation workflows

### Adding New Integrations

1. Add API credentials to `.env.local`
2. Create API functions in `lib/apiHooks.js`
3. Update `lib/aiCommandProcessor.js` to handle new commands
4. Add UI components as needed

---

## 🤖 AI Command Processing

The AI command processor (`lib/aiCommandProcessor.js`) handles:

### Command Classification
Uses pattern matching to identify intent:
- **Data Summary**: "show leads", "how many tasks"
- **Action**: "message leads", "create task"
- **Planning**: "remind me", "schedule"

### Command Execution
Each command type maps to specific API calls:
```javascript
classifyIntent(userInput) → Intent
executeCommand(input, intent) → Response
```

### Response Format
```javascript
{
  type: 'data' | 'action' | 'planning' | 'error',
  message: 'Human-readable response',
  data: { key: value }, // Optional
  action: 'action_name', // Optional
  requiresInput: boolean // Optional
}
```

---

## 🎯 Usage Examples

### Natural Language Commands

**Data Queries:**
```
"Show me leads by source for this week"
"How many open tasks do I have?"
"What are my pending invoices?"
"Summarize today's activity"
```

**Actions:**
```
"Message all leads marked for follow-up"
"Create a task for crew dispatch"
"Send invoice to ABC Corp"
"Schedule a message for tomorrow at 9 AM"
```

**Planning:**
```
"Remind me to check payroll tomorrow at 9 AM"
"Schedule a follow-up for next Monday"
```

---

## 🎨 UI Components

### MoatMeter
```jsx
<MoatMeter
  routinesCount={4}      // Active routines
  totalRoutines={10}     // Total available
  aiAgentsCount={4}      // Active agents
  totalAgents={6}        // Total available
/>
```

### DashboardWidgets
Automatically displays all 4 widgets with live data.

### AIChatInterface
Floating chat bubble with:
- Text input
- Voice input (Web Speech API)
- Quick command buttons
- Message history
- Typing indicators

---

## 🚧 Roadmap

### Phase 1 (Current)
- ✅ Dashboard layout
- ✅ Moat Meter component
- ✅ Dashboard widgets with dummy data
- ✅ AI Chat Interface
- ✅ Routine Manager
- ✅ AI Staff Panel
- ✅ Reports & Insights
- ✅ Settings page

### Phase 2 (Next)
- [ ] Connect real APIs (Trello, Google Sheets, etc.)
- [ ] Implement GPT-4/Claude for AI responses
- [ ] Add voice input with Web Speech API
- [ ] Real-time notifications
- [ ] User authentication
- [ ] Multi-user support

### Phase 3 (Future)
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Custom routine builder
- [ ] AI agent marketplace
- [ ] Integrations marketplace

---

## 🔒 Security

- All API keys stored in environment variables
- 256-bit encryption for sensitive data
- HTTPS required for production
- Rate limiting on API calls
- User permission system for AI agents

---

## 📝 License

MIT License - see LICENSE file for details

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 💬 Support

For questions or issues:
- GitHub Issues: [Report a bug](https://github.com/yourusername/business-command-center/issues)
- Email: support@yourcompany.com

---

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [Lucide Icons](https://lucide.dev/)

---

**Built with ❤️ for small business owners**
