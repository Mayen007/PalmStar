/**
 * Testimonials Slider Module
 * Handles testimonial carousel with automatic scrolling and navigation dots
 */

const testimonialSlider = document.getElementById('testimonialSlider');
const testimonialDots = document.getElementById('testimonialDots');

/**
 * Initialize testimonial slider with dots and auto-scroll
 */
function initializeTestimonials() {
  if (!testimonialSlider || !testimonialDots) return;

  const testimonialCards = testimonialSlider.querySelectorAll('.testimonial-card');
  let currentCard = 0;
  let autoScrollInterval;

  /**
   * Scroll to specific testimonial card
   * @param {number} index - Card index to scroll to
   */
  function scrollToCard(index) {
    const cardWidth = testimonialCards[0].offsetWidth + 30; // 30 for margin
    testimonialSlider.scrollLeft = cardWidth * index;
    updateActiveDot(index);
    // Stop automatic scrolling when a dot is clicked
    clearInterval(autoScrollInterval);
  }

  /**
   * Update active state of navigation dots
   * @param {number} index - Active card index
   */
  function updateActiveDot(index) {
    const dots = testimonialDots.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
      dot.classList.remove('active');
      dot.removeAttribute('aria-current');
      if (i === index) {
        dot.classList.add('active');
        dot.setAttribute('aria-current', 'true');
      }
    });
  }

  /**
   * Start automatic scrolling through testimonials
   */
  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      currentCard = (currentCard + 1) % testimonialCards.length;
      scrollToCard(currentCard);
    }, 4000); // Change card every 4 seconds
  }

  // Generate navigation dots dynamically
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

    // Click handler
    dot.addEventListener('click', () => {
      scrollToCard(index);
    });

    // Keyboard support for dots
    dot.addEventListener('keypress', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        scrollToCard(index);
      }
    });

    testimonialDots.appendChild(dot);
  });

  // Track manual scrolling and update active dot
  testimonialSlider.addEventListener('scroll', () => {
    const cardWidth = testimonialCards[0].offsetWidth + 30;
    const scrollLeft = testimonialSlider.scrollLeft;
    const newCurrentCard = Math.round(scrollLeft / cardWidth);

    // Update active dot only if the current card has changed
    if (newCurrentCard !== currentCard) {
      currentCard = newCurrentCard;
      updateActiveDot(currentCard);
    }
  });

  // Start auto-scrolling
  startAutoScroll();
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeTestimonials);
} else {
  initializeTestimonials();
}
