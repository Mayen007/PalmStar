// Get the button element
const backToTopButton = document.getElementById("myBtn");

// Function to scroll to the top of the page smoothly
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Function to show/hide the button based on scroll position
function handleScroll() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
}

// Add event listener to trigger the handleScroll function when the user scrolls
window.addEventListener('scroll', handleScroll);

const bookingModal = document.getElementById('bookingModal');
bookingModal.addEventListener('show.bs.modal', function (event) {
  const button = event.relatedTarget;
  const destination = button.getAttribute('data-destination');

  const selectedDestinationInput = bookingModal.querySelector('#selected-destination');
  selectedDestinationInput.value = destination;

  const destinationSelect = bookingModal.querySelector('#destination');
  destinationSelect.value = destination;
});


// Get references to elements
const chatIcon = document.getElementById("chat-icon");
const chatWindow = document.getElementById("chat-window");
const heroSection = document.getElementById("home");

// Function to show/hide icon based on scroll position
function handleScroll() {
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

  if (chatWindow.style.display === "none" || chatWindow.style.display === "") {
    chatWindow.style.display = "block";
    chatIcon.style.display = "none";
  } else {
    chatWindow.style.display = "none";
    // Show the icon if the user is not on the hero section
    const heroRect = heroSection.getBoundingClientRect();
    const chatIconRect = chatIcon.getBoundingClientRect();
    if (!(heroRect.top <= chatIconRect.bottom && heroRect.bottom >= chatIconRect.top)) {
      chatIcon.style.display = "block";
    }
  }
}
// Function to send the message and handle the response
function sendMessage() {
  const userInput = document.getElementById("user-input").value;
  if (userInput.trim() !== '') {
    // Add user message to the chat body
    addToChat("user", userInput);

    // Get response from your chatbot backend (replace with your actual implementation)
    getBotResponse(userInput)
      .then(response => {
        // Add bot's response to the chat body
        addToChat("bot", response);
      })
      .catch(error => {
        // Handle errors (e.g., display an error message)
        console.error(error);
        addToChat("bot", "Sorry, I'm having trouble understanding. Please try again later.");
      });

    // Clear input field
    document.getElementById("user-input").value = '';
  }
}

// Function to add message to chat
function addToChat(sender, message) {
  const chatBody = document.querySelector('.chat-body');
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);

  // Handle messages with links
  if (message.includes("<a href=")) {
    messageElement.innerHTML = message; // Set as innerHTML to render the link
  } else {
    messageElement.textContent = message; // Set as textContent for regular messages
  }

  chatBody.appendChild(messageElement);

  // Scroll to the bottom of the chat
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Placeholder function to simulate getting a bot response
function getBotResponse(userInput) {
  return new Promise((resolve, reject) => {
    // Replace with your actual chatbot API call
    setTimeout(() => {
      const defaultResponse = "Welcome to PalmStar! How can I help you plan your dream vacation? <a href='#destinations'>Explore our destinations</a> or <a href='#packages'>view our packages</a>.";
      resolve(defaultResponse);
    }, 1000); // Simulate a 1-second delay
  });
}
function addToChat(sender, message) {
  const chatBody = document.querySelector('.chat-body');
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender);

  // Handle messages with links
  if (message.includes("<a href=")) {
    messageElement.innerHTML = message;
  } else {
    messageElement.textContent = message;
  }

  chatBody.appendChild(messageElement);

  // Scroll to the bottom only if the user is already at the bottom or near it
  if (chatBody.scrollTop >= chatBody.scrollHeight - chatBody.clientHeight - 10) {
    chatBody.scrollTop = chatBody.scrollHeight;
  }
}


// Add event listeners
window.addEventListener('scroll', handleScroll); // Show/hide on scroll
handleScroll(); // Initial check on page load
