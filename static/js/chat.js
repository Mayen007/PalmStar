/**
 * Chat Widget Module
 * Handles chat functionality, visibility, and interactions
 */

// Get references to chat elements
const chatIcon = document.getElementById("chat-icon");
const chatWindow = document.getElementById("chat-window");
const heroSection = document.getElementById("home");
const userInputField = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

/**
 * Show/hide chat icon based on scroll position relative to hero section
 */
function handleScroll() {
  if (!heroSection || !chatIcon) return;

  const heroRect = heroSection.getBoundingClientRect();
  const chatIconRect = chatIcon.getBoundingClientRect();

  if (heroRect.top <= chatIconRect.bottom && heroRect.bottom >= chatIconRect.top) {
    chatIcon.style.display = "none";
  } else {
    // Only show the icon if the chat window is closed
    if (chatWindow.style.display === "none" || chatWindow.style.display === "") {
      chatIcon.style.display = "block";
    }
  }
}

/**
 * Toggle chat window visibility
 * Manages focus and displays welcome message on first open
 */
function toggleChatWindow() {
  const chatWindow = document.getElementById("chat-window");
  const chatIcon = document.getElementById("chat-icon");
  const userInputField = document.getElementById("user-input");

  if (chatWindow.style.display === "none" || chatWindow.style.display === "") {
    chatWindow.style.display = "block";
    chatIcon.style.display = "none";

    // Focus on input field when chat opens for better accessibility
    if (userInputField) {
      setTimeout(() => userInputField.focus(), 100);
    }

    // Send welcome message ONLY when the chat window is opened
    sendWelcomeMessage();
  } else {
    chatWindow.style.display = "none";

    // Return focus to chat icon when closing
    if (chatIcon) {
      chatIcon.focus();
    }

    // Show the icon if the user is not on the hero section
    if (!heroSection) return;
    const heroRect = heroSection.getBoundingClientRect();
    const chatIconRect = chatIcon.getBoundingClientRect();
    if (!(heroRect.top <= chatIconRect.bottom && heroRect.bottom >= chatIconRect.top)) {
      chatIcon.style.display = "block";
    }
  }
}

/**
 * Send welcome message to chat
 */
function sendWelcomeMessage() {
  addToChat("bot", "Welcome to PalmStar! How can I help you plan your dream vacation?");
}

/**
 * Add message to chat body
 * @param {string} sender - 'bot' or 'user'
 * @param {string} message - Message content
 */
function addToChat(sender, message) {
  const chatBody = document.querySelector(".chat-body");
  if (!chatBody) return;

  const messageElement = document.createElement("div");
  messageElement.classList.add("message", sender === "bot" ? "bot" : "user");
  messageElement.textContent = message;
  chatBody.appendChild(messageElement);
  chatBody.scrollTop = chatBody.scrollHeight; // Scroll to the bottom
}

/**
 * Send user message and get bot response
 */
function sendMessage() {
  if (!userInputField) return;

  const userInput = userInputField.value;
  if (userInput.trim() !== "") {
    addToChat("user", userInput);
    userInputField.value = "";
    getBotResponse(userInput).then(response => {
      addToChat("bot", response);
    });
  }
}

/**
 * Simulate bot response (placeholder for actual chatbot API)
 * @param {string} userInput - User's message
 * @returns {Promise<string>} Bot's response
 */
function getBotResponse(userInput) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("How can I be of help?"); // Replace with actual chatbot logic
    }, 1000); // Simulate a 1-second delay
  });
}

// Initialize chat event listeners
function initializeChat() {
  // Scroll-based visibility
  if (heroSection && chatIcon) {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
  }

  // Send message on button click or Enter key
  if (sendButton && userInputField) {
    sendButton.addEventListener('click', sendMessage);
    userInputField.addEventListener('keypress', function (event) {
      if (event.key === "Enter") {
        sendMessage();
      }
    });
  }

  // Close chat with Escape key
  if (chatWindow) {
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && chatWindow.style.display !== 'none') {
        toggleChatWindow();
      }
    });
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeChat);
} else {
  initializeChat();
}

// Make function globally available for onclick handlers
if (typeof window !== 'undefined') {
  window.toggleChatWindow = toggleChatWindow;
  window.sendMessage = sendMessage;
}
