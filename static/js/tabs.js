/**
 * Tabs Module
 * Handles tab switching functionality for login/signup pages
 */

/**
 * Switch between tab content
 * @param {Event} event - Click event
 * @param {string} tabName - ID of tab content to show
 */
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

  // Show the current tab content and add the active class to the button
  const targetTab = document.getElementById(tabName);
  if (targetTab) {
    targetTab.classList.add("active");
  }

  if (event && event.currentTarget) {
    event.currentTarget.className += " active";
  }
}

/**
 * Initialize tabs - set first tab as active
 */
function initializeTabs() {
  const firstTab = document.getElementsByClassName("tab")[0];
  if (firstTab) {
    firstTab.click();
  }
}

// Auto-initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initializeTabs);

// Make function globally available for onclick handlers
if (typeof window !== 'undefined') {
  window.openTab = openTab;
}
