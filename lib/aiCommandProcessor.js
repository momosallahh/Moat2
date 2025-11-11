// AI Command Processor
// Interprets natural language commands and executes appropriate actions

import { trelloAPI, googleSheetsAPI, gmailAPI, twilioAPI, quickBooksAPI, automationAPI } from './apiHooks';

/**
 * Command types
 */
const COMMAND_TYPES = {
  DATA_SUMMARY: 'data_summary',
  ACTION: 'action',
  PLANNING: 'planning',
  QUESTION: 'question'
};

/**
 * Intent patterns - simple keyword matching
 * In production, this would use GPT-4 or Claude for intent classification
 */
const intentPatterns = {
  // Data queries
  'show.*leads': { type: COMMAND_TYPES.DATA_SUMMARY, action: 'getLeads' },
  'how many.*leads': { type: COMMAND_TYPES.DATA_SUMMARY, action: 'getLeads' },
  'list.*tasks': { type: COMMAND_TYPES.DATA_SUMMARY, action: 'getTasks' },
  'open.*tasks': { type: COMMAND_TYPES.DATA_SUMMARY, action: 'getTasks' },
  'show.*invoices': { type: COMMAND_TYPES.DATA_SUMMARY, action: 'getInvoices' },
  'pending.*invoices': { type: COMMAND_TYPES.DATA_SUMMARY, action: 'getInvoices' },
  'show.*messages': { type: COMMAND_TYPES.DATA_SUMMARY, action: 'getMessages' },
  'hours.*worked': { type: COMMAND_TYPES.DATA_SUMMARY, action: 'getHours' },
  'summarize.*today': { type: COMMAND_TYPES.DATA_SUMMARY, action: 'getDailySummary' },
  'summarize.*week': { type: COMMAND_TYPES.DATA_SUMMARY, action: 'getWeeklySummary' },

  // Actions
  'message.*leads': { type: COMMAND_TYPES.ACTION, action: 'messageLeads' },
  'send.*message': { type: COMMAND_TYPES.ACTION, action: 'sendMessage' },
  'create.*task': { type: COMMAND_TYPES.ACTION, action: 'createTask' },
  'add.*task': { type: COMMAND_TYPES.ACTION, action: 'createTask' },
  'send.*invoice': { type: COMMAND_TYPES.ACTION, action: 'sendInvoice' },
  'schedule.*message': { type: COMMAND_TYPES.ACTION, action: 'scheduleMessage' },

  // Planning
  'remind.*me': { type: COMMAND_TYPES.PLANNING, action: 'createReminder' },
  'schedule': { type: COMMAND_TYPES.PLANNING, action: 'scheduleTask' }
};

/**
 * Classify user intent from natural language input
 */
export function classifyIntent(input) {
  const lowerInput = input.toLowerCase();

  for (const [pattern, intent] of Object.entries(intentPatterns)) {
    const regex = new RegExp(pattern, 'i');
    if (regex.test(lowerInput)) {
      return intent;
    }
  }

  return { type: COMMAND_TYPES.QUESTION, action: 'general' };
}

/**
 * Execute command based on classified intent
 */
export async function executeCommand(input, intent) {
  const { type, action } = intent;

  try {
    switch (action) {
      // Data Summary Actions
      case 'getLeads':
        return await handleGetLeads();

      case 'getTasks':
        return await handleGetTasks();

      case 'getInvoices':
        return await handleGetInvoices();

      case 'getMessages':
        return await handleGetMessages();

      case 'getDailySummary':
        return await handleDailySummary();

      case 'getWeeklySummary':
        return await handleWeeklySummary();

      // Action Commands
      case 'messageLeads':
        return handleMessageLeads(input);

      case 'sendMessage':
        return handleSendMessage(input);

      case 'createTask':
        return handleCreateTask(input);

      case 'scheduleMessage':
        return handleScheduleMessage(input);

      // Planning Commands
      case 'createReminder':
        return handleCreateReminder(input);

      case 'scheduleTask':
        return handleScheduleTask(input);

      // General question
      case 'general':
      default:
        return handleGeneralQuestion(input);
    }
  } catch (error) {
    console.error('Command execution error:', error);
    return {
      type: 'error',
      message: 'Sorry, I encountered an error processing your request.',
      error: error.message
    };
  }
}

/**
 * Command Handlers
 */

async function handleGetLeads() {
  const data = await googleSheetsAPI.getLeads();
  return {
    type: 'data',
    message: `You have ${data.total} total leads, with ${data.thisWeek} added this week.`,
    data: {
      'Total Leads': data.total,
      'This Week': data.thisWeek,
      'Status': 'Active pipeline'
    },
    visual: 'table'
  };
}

async function handleGetTasks() {
  const data = await trelloAPI.getTasks();
  return {
    type: 'data',
    message: `You have ${data.tasks.length} open tasks.`,
    data: {
      'Open Tasks': data.tasks.length,
      'Pending': data.tasks.filter(t => t.status === 'pending').length,
      'In Progress': data.tasks.filter(t => t.status === 'in-progress').length
    },
    visual: 'list'
  };
}

async function handleGetInvoices() {
  const data = await quickBooksAPI.getInvoices();
  return {
    type: 'data',
    message: `You have $${data.totalPending} in pending invoices.`,
    data: {
      'Total Pending': `$${data.totalPending}`,
      'Total Paid': `$${data.totalPaid}`,
      'Invoice Count': data.invoices.length
    }
  };
}

async function handleGetMessages() {
  const smsData = await twilioAPI.getMessages();
  const emailData = await gmailAPI.getMessages();

  return {
    type: 'data',
    message: `You have ${smsData.scheduledCount} scheduled SMS and ${emailData.unreadCount} unread emails.`,
    data: {
      'Scheduled SMS': smsData.scheduledCount,
      'Unread Emails': emailData.unreadCount,
      'Recent Messages': smsData.messages.length
    }
  };
}

async function handleDailySummary() {
  // Aggregate data from multiple sources
  const leads = await googleSheetsAPI.getLeads();
  const tasks = await trelloAPI.getTasks();
  const invoices = await quickBooksAPI.getInvoices();

  return {
    type: 'summary',
    message: "Here's your business summary for today:",
    data: {
      'New Leads': '12',
      'Tasks Completed': '8 / 23',
      'Revenue': `$${invoices.totalPaid}`,
      'Active Jobs': '5'
    }
  };
}

async function handleWeeklySummary() {
  return {
    type: 'summary',
    message: "Here's your business summary for this week:",
    data: {
      'Leads Generated': '47',
      'Jobs Completed': '23',
      'Revenue': '$18,450',
      'Customer Satisfaction': '4.8/5.0'
    }
  };
}

function handleMessageLeads(input) {
  return {
    type: 'action',
    message: 'I can send a message to leads marked for follow-up. What would you like to say?',
    action: 'compose_message',
    requiresInput: true
  };
}

function handleSendMessage(input) {
  return {
    type: 'action',
    message: 'Message prepared. Would you like me to send it now?',
    action: 'confirm_send',
    requiresConfirmation: true
  };
}

function handleCreateTask(input) {
  return {
    type: 'action',
    message: 'I can create a new task. What should the task be?',
    action: 'create_task_form',
    requiresInput: true
  };
}

function handleScheduleMessage(input) {
  return {
    type: 'action',
    message: 'When would you like to schedule this message?',
    action: 'schedule_form',
    requiresInput: true
  };
}

function handleCreateReminder(input) {
  return {
    type: 'planning',
    message: 'Reminder created! I\'ll notify you at the specified time.',
    action: 'reminder_set'
  };
}

function handleScheduleTask(input) {
  return {
    type: 'planning',
    message: 'Task scheduled successfully.',
    action: 'task_scheduled'
  };
}

function handleGeneralQuestion(input) {
  return {
    type: 'acknowledgment',
    message: 'I understand. In a live environment, I would use AI (GPT-4 or Claude) to answer this question based on your business data.',
    suggestion: 'Try asking about leads, tasks, invoices, or request an action like "message all leads".'
  };
}

/**
 * Generate AI response using OpenAI or Anthropic
 * This is a placeholder - in production, this would make actual API calls
 */
export async function generateAIResponse(prompt, context = {}) {
  // Placeholder for AI API call
  console.log('AI Prompt:', prompt);
  console.log('Context:', context);

  return {
    response: 'This is a simulated AI response. In production, this would call GPT-4 or Claude API.',
    confidence: 0.95
  };
}
