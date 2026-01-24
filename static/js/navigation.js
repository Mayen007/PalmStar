/**
 * Navigation Module
 * Handles back-to-top button functionality
 */

// Back to top button
const backToTopButton = document.getElementById("myBtn");

/**
 * Scroll to the top of the page smoothly
 */
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Make function globally available for onclick handlers
if (typeof window !== 'undefined') {
  window.scrollToTop = scrollToTop;
}
