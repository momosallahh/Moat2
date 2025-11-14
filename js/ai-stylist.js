// T-Fa AI Fashion Stylist - Anna AI

// Product database for recommendations
const productDatabase = {
  hat: {
    id: 'hat',
    name: 'The Hat — The Beginning',
    price: 295,
    symbolism: 'Represents the moment a father placed his hat on his daughter\'s head before leaving. A symbol of protection, love, and inheritance.',
    matchesWith: ['bodysuit', 'two-in-one'],
    occasions: ['Editorial photoshoots', 'Fashion events', 'Artistic expression'],
    sizes: ['S', 'M', 'L']
  },
  bodysuit: {
    id: 'bodysuit',
    name: 'The Bodysuit — The Rebirth',
    price: 495,
    symbolism: 'The cocoon of transformation. Represents the journey from grief to healing, from loss to rebirth.',
    matchesWith: ['hat', 'two-in-one'],
    occasions: ['Evening events', 'Gallery openings', 'Intimate celebrations'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  'two-in-one': {
    id: 'two-in-one',
    name: 'Two-in-One Pants & Skirt — The Unity',
    price: 595,
    symbolism: 'Duality and unity. The merging of past and present, tradition and innovation, strength and grace.',
    matchesWith: ['hat', 'bodysuit'],
    occasions: ['Versatile wear', 'Day to night', 'Creative expression'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  }
};

// AI Responses Database
const aiResponses = {
  greetings: [
    "Hello! I'm Anna AI, your personal stylist for T-Fa. Each piece in our collection tells a story of love, loss, and rebirth. How can I help you find your perfect piece today?",
    "Welcome to T-Fa! I'm here to help you discover pieces that resonate with your story. What are you looking for?",
    "Hi there! I'm Anna, and I'd love to help you explore The Rebirth Collection. Every piece carries deep meaning and emotion. What speaks to you?"
  ],
  recommendations: {
    hat: "The Hat is iconic — it's where everything began. This piece carries the weight of a father's love and a daughter's memory. I'd recommend pairing it with The Bodysuit for a complete editorial look, or with The Two-in-One for versatile everyday elegance.",
    bodysuit: "The Bodysuit is transformation embodied. It hugs you like a second skin, representing the journey from pain to power. Pair it with The Two-in-One for a striking evening ensemble, or wear it with tailored trousers for a more contemporary feel.",
    'two-in-one': "The Two-in-One is pure versatility — wear it as pants for structure, transform it to a skirt for fluidity. It represents the duality within all of us. Beautiful with The Hat for artistic flair, or The Bodysuit for complete sophistication."
  },
  sizing: {
    general: "T-Fa pieces are designed to fit true to size with a luxury, tailored feel. Each piece is crafted for comfort and elegance. Would you like specific measurements for any item?",
    hat: "The Hat comes in S, M, and L. It's designed to sit elegantly with an adjustable interior band for the perfect fit.",
    bodysuit: "The Bodysuit has slight stretch for comfort. We recommend your usual size for a sculpted fit, or size up for a more relaxed feel.",
    'two-in-one': "The Two-in-One runs true to size. The waist is adjustable, and the transformative design allows for customization in how you wear it."
  },
  symbolism: {
    general: "Every T-Fa piece is a chapter in a story of love, loss, and rebirth. The father (T), the mother (F), and Anna (a) — three lives intertwined in fashion that heals.",
    collection: "The Rebirth Collection is about transformation. The Hat is the beginning, The Bodysuit is the metamorphosis, and The Two-in-One is the union of all that was and all that will be."
  }
};

// Initialize AI Stylist
document.addEventListener('DOMContentLoaded', function() {
  initializeAIStylist();
});

function initializeAIStylist() {
  const aiToggle = document.getElementById('aiToggleBtn');
  const aiPanel = document.querySelector('.ai-stylist');
  const closeAI = document.querySelector('.close-ai');
  const aiForm = document.getElementById('aiChatForm');

  if (aiToggle) {
    aiToggle.addEventListener('click', openAIStylist);
  }

  if (closeAI) {
    closeAI.addEventListener('click', closeAIStylist);
  }

  if (aiForm) {
    aiForm.addEventListener('submit', handleAIChat);
  }

  // Initial greeting
  if (document.querySelector('.ai-chat-messages')) {
    addAIMessage(aiResponses.greetings[0], 'bot');
  }
}

function openAIStylist() {
  const aiPanel = document.querySelector('.ai-stylist');
  if (aiPanel) {
    aiPanel.classList.add('open');
  }
}

function closeAIStylist() {
  const aiPanel = document.querySelector('.ai-stylist');
  if (aiPanel) {
    aiPanel.classList.remove('open');
  }
}

function handleAIChat(e) {
  e.preventDefault();

  const input = document.getElementById('aiInput');
  const userMessage = input.value.trim();

  if (!userMessage) return;

  // Add user message
  addAIMessage(userMessage, 'user');

  // Clear input
  input.value = '';

  // Process and respond
  setTimeout(() => {
    const response = processUserMessage(userMessage);
    addAIMessage(response, 'bot');
  }, 800);
}

function addAIMessage(message, type) {
  const messagesContainer = document.querySelector('.ai-chat-messages');
  if (!messagesContainer) return;

  const messageDiv = document.createElement('div');
  messageDiv.className = `ai-message ${type}`;
  messageDiv.textContent = message;

  messagesContainer.appendChild(messageDiv);

  // Scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function processUserMessage(message) {
  const lowerMessage = message.toLowerCase();

  // Greeting detection
  if (lowerMessage.match(/\b(hi|hello|hey|greetings)\b/)) {
    return aiResponses.greetings[Math.floor(Math.random() * aiResponses.greetings.length)];
  }

  // Product-specific queries
  if (lowerMessage.includes('hat')) {
    if (lowerMessage.includes('size') || lowerMessage.includes('fit')) {
      return aiResponses.sizing.hat;
    }
    if (lowerMessage.includes('mean') || lowerMessage.includes('symbol') || lowerMessage.includes('story')) {
      return `${productDatabase.hat.symbolism} ${aiResponses.recommendations.hat}`;
    }
    if (lowerMessage.includes('match') || lowerMessage.includes('pair') || lowerMessage.includes('wear')) {
      return aiResponses.recommendations.hat;
    }
    return `The Hat is our signature piece. ${productDatabase.hat.symbolism} Priced at $${productDatabase.hat.price}. ${aiResponses.recommendations.hat}`;
  }

  if (lowerMessage.includes('bodysuit')) {
    if (lowerMessage.includes('size') || lowerMessage.includes('fit')) {
      return aiResponses.sizing.bodysuit;
    }
    if (lowerMessage.includes('mean') || lowerMessage.includes('symbol') || lowerMessage.includes('story')) {
      return `${productDatabase.bodysuit.symbolism} ${aiResponses.recommendations.bodysuit}`;
    }
    if (lowerMessage.includes('match') || lowerMessage.includes('pair') || lowerMessage.includes('wear')) {
      return aiResponses.recommendations.bodysuit;
    }
    return `The Bodysuit represents rebirth and transformation. ${productDatabase.bodysuit.symbolism} Priced at $${productDatabase.bodysuit.price}. ${aiResponses.recommendations.bodysuit}`;
  }

  if (lowerMessage.includes('two-in-one') || lowerMessage.includes('pants') || lowerMessage.includes('skirt')) {
    if (lowerMessage.includes('size') || lowerMessage.includes('fit')) {
      return aiResponses.sizing['two-in-one'];
    }
    if (lowerMessage.includes('mean') || lowerMessage.includes('symbol') || lowerMessage.includes('story')) {
      return `${productDatabase['two-in-one'].symbolism} ${aiResponses.recommendations['two-in-one']}`;
    }
    if (lowerMessage.includes('match') || lowerMessage.includes('pair') || lowerMessage.includes('wear')) {
      return aiResponses.recommendations['two-in-one'];
    }
    return `The Two-in-One is versatility and unity in one piece. ${productDatabase['two-in-one'].symbolism} Priced at $${productDatabase['two-in-one'].price}. ${aiResponses.recommendations['two-in-one']}`;
  }

  // Sizing questions
  if (lowerMessage.includes('size') || lowerMessage.includes('fit') || lowerMessage.includes('measure')) {
    return aiResponses.sizing.general + " Which piece are you interested in?";
  }

  // Story/symbolism questions
  if (lowerMessage.includes('story') || lowerMessage.includes('meaning') || lowerMessage.includes('symbol')) {
    return aiResponses.symbolism.collection;
  }

  // Recommendation requests
  if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('what should')) {
    return "I'd love to recommend something perfect for you! Are you drawn to:\n\n• The Hat — Iconic and editorial\n• The Bodysuit — Transformative and elegant\n• The Two-in-One — Versatile and modern\n\nOr tell me about the occasion and I'll suggest the perfect piece!";
  }

  // Complete the look
  if (lowerMessage.includes('complete') || lowerMessage.includes('full collection') || lowerMessage.includes('all three')) {
    return "The complete Rebirth Collection is a powerful statement. All three pieces together tell the full story of transformation:\n\n• The Hat ($295) — Your beginning\n• The Bodysuit ($495) — Your journey\n• The Two-in-One ($595) — Your unity\n\nTotal: $1,385\n\nWould you like to add all three to your cart?";
  }

  // Occasion-based
  if (lowerMessage.includes('event') || lowerMessage.includes('occasion') || lowerMessage.includes('wear')) {
    return "Each piece has its moment:\n\n• Evening event? The Bodysuit paired with The Two-in-One\n• Editorial shoot? The Hat is iconic\n• Versatile daily wear? The Two-in-One transforms from day to night\n\nWhat's the occasion?";
  }

  // Price questions
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
    return "The Rebirth Collection pricing:\n\n• The Hat — $295\n• The Bodysuit — $495\n• The Two-in-One — $595\n\nComplete collection: $1,385\n\nEach piece is an investment in artistry and emotion.";
  }

  // Custom design
  if (lowerMessage.includes('custom') || lowerMessage.includes('bespoke') || lowerMessage.includes('personal')) {
    return "T-Fa offers custom design services! You can create a piece that tells YOUR story. Visit our Custom Design page to:\n\n• Upload inspiration photos\n• Share your measurements\n• Tell us your story\n• Request a personal consultation\n\nShall I guide you there?";
  }

  // Default response
  return "I'm here to help you discover pieces that resonate with your journey. You can ask me about:\n\n• Product recommendations\n• Styling advice\n• Size guidance\n• The story behind each piece\n• How to complete your look\n\nWhat would you like to know?";
}

// Quick action buttons (could be added to the chat interface)
function quickRecommend(productId) {
  const product = productDatabase[productId];
  if (product) {
    addAIMessage(aiResponses.recommendations[productId], 'bot');
    openAIStylist();
  }
}

// Upsell function that can be called from product pages
function suggestCompleteLook(currentProduct) {
  const product = productDatabase[currentProduct];
  if (product && product.matchesWith.length > 0) {
    const suggestions = product.matchesWith.map(id => productDatabase[id].name).join(' and ');
    const message = `To complete the story with ${product.name}, I suggest adding ${suggestions}. Together, they create a powerful narrative of transformation.`;

    addAIMessage(message, 'bot');
    openAIStylist();
  }
}

// Export functions for use in other scripts
window.AIStylist = {
  open: openAIStylist,
  close: closeAIStylist,
  recommend: quickRecommend,
  suggestCompleteLook: suggestCompleteLook
};
