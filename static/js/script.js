// Get the button element
const backToTopButton = document.getElementById("myBtn");

// Function to scroll to the top of the page smoothly
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Get references to elements
const chatIcon = document.getElementById("chat-icon");
const chatWindow = document.getElementById("chat-window");
const heroSection = document.getElementById("home");
const userInputField = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

// Function to show/hide icon based on scroll position
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

// Toggle chat window function
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

// Function to send the welcome message
function sendWelcomeMessage() {
  addToChat("bot", "Welcome to PalmStar! How can I help you plan your dream vacation?");
}

// Function to add messages to the chat
function addToChat(sender, message) {
  const chatBody = document.querySelector(".chat-body");
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", sender === "bot" ? "bot" : "user");
  messageElement.textContent = message;
  chatBody.appendChild(messageElement);
  chatBody.scrollTop = chatBody.scrollHeight; // Scroll to the bottom
}

// Function to send a message
function sendMessage() {
  const userInput = userInputField.value;
  if (userInput.trim() !== "") {
    addToChat("user", userInput);
    userInputField.value = "";
    getBotResponse(userInput).then(response => {
      addToChat("bot", response);
    });
  }
}

// Placeholder function to simulate getting a bot response (replace with your actual chatbot API call)
function getBotResponse(userInput) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("How can I be of help?"); // Replace with your actual chatbot logic
    }, 1000); // Simulate a 1-second delay
  });
}

// Add event listeners
if (heroSection && chatIcon) {
  window.addEventListener('scroll', handleScroll);
  handleScroll();
}

if (sendButton && userInputField) {
  sendButton.addEventListener('click', sendMessage);
  userInputField.addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });
}

// Add keyboard support for closing chat with Escape key
if (chatWindow) {
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && chatWindow.style.display !== 'none') {
      toggleChatWindow();
    }
  });
}



const testimonialSlider = document.getElementById('testimonialSlider');
const testimonialDots = document.getElementById('testimonialDots');

if (testimonialSlider && testimonialDots) {
  const testimonialCards = testimonialSlider.querySelectorAll('.testimonial-card');

  // Generate Dots dynamically
  testimonialCards.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.setAttribute('role', 'button');
    dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
    dot.setAttribute('tabindex', '0');
    if (index === 0) {
      dot.classList.add('active');
      dot.setAttribute('aria-current', 'true');
    }
    dot.addEventListener('click', () => {
      scrollToCard(index);
    });
    // Add keyboard support for dots
    dot.addEventListener('keypress', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        scrollToCard(index);
      }
    });
    testimonialDots.appendChild(dot);
  });

  function scrollToCard(index) {
    const cardWidth = testimonialCards[0].offsetWidth + 30; // 30 for margin
    testimonialSlider.scrollLeft = cardWidth * index;
    updateActiveDot(index);
    // Stop automatic scrolling when a dot is clicked
    clearInterval(autoScrollInterval);
  }

  function updateActiveDot(index) {
    const dots = testimonialDots.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
      dot.classList.remove('active'); // Reset active class for all dots
      dot.removeAttribute('aria-current');
      if (i === index) {
        dot.classList.add('active');
        dot.setAttribute('aria-current', 'true');
      }
    });
  }

  // Automatic scroll (Optional)
  let currentCard = 0;
  let autoScrollInterval;

  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      currentCard = (currentCard + 1) % testimonialCards.length;
      scrollToCard(currentCard);
    }, 4000); // Change card every 5 seconds
  }

  // Start the auto scroll when the page loads
  startAutoScroll();

  testimonialSlider.addEventListener('scroll', () => {
    // Calculate the current card based on scroll position
    const cardWidth = testimonialCards[0].offsetWidth + 30;
    const scrollLeft = testimonialSlider.scrollLeft;
    const newCurrentCard = Math.round(scrollLeft / cardWidth);

    // Update active dot only if the current card has changed
    if (newCurrentCard !== currentCard) {
      currentCard = newCurrentCard;
      updateActiveDot(currentCard);
    }
  });
}

function openTab(event, tabName) {
  let i, tabcontent, tablinks;

  // Hide all tab content
  tabcontent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].classList.remove("active");
  }

  // Remove the active class from all tab buttons
  tablinks = document.getElementsByClassName("tab");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab content and add the active class to the button that opened the tab
  document.getElementById(tabName).classList.add("active");
  event.currentTarget.className += " active";
}

// Set the default tab to be open
document.addEventListener("DOMContentLoaded", function () {
  document.getElementsByClassName("tab")[0].click();
});
