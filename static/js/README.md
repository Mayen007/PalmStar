# JavaScript Module Organization

This directory contains modular JavaScript files for better code organization and maintainability.

## Module Structure

### Core Modules

#### `navigation.js`

- **Purpose**: Handles back-to-top button functionality
- **Used in**: All pages (index.html, blog.html, contact.html)
- **Features**:
  - Smooth scroll to top
  - Globally available `scrollToTop()` function

#### `chat.js`

- **Purpose**: Manages chat widget functionality
- **Used in**: index.html
- **Features**:
  - Toggle chat window visibility
  - Send/receive messages
  - Scroll-based icon visibility
  - Keyboard support (Escape to close)
  - Focus management for accessibility
  - Auto-focus on input when opened
  - ARIA live region updates

#### `testimonials.js`

- **Purpose**: Handles testimonial slider with navigation
- **Used in**: index.html
- **Features**:
  - Dynamic dot navigation generation
  - Auto-scroll functionality (4-second interval)
  - Manual scroll detection
  - Keyboard-accessible navigation dots
  - ARIA attributes for accessibility

#### `tabs.js`

- **Purpose**: Tab switching functionality
- **Used in**: login.html
- **Features**:
  - Toggle between login/signup forms
  - Accessible tab interface
  - Auto-initialization

### Legacy Files

#### `script.js`

- **Status**: Deprecated (kept for backward compatibility)
- **Purpose**: Legacy entry point
- **Note**: Functionality has been split into modular files
- **Recommendation**: Remove after verifying all pages work with new modules

## Usage

### Loading Modules

Each HTML page loads only the modules it needs:

**index.html** (Full functionality):

```html
<script src="./static/js/navigation.js"></script>
<script src="./static/js/chat.js"></script>
<script src="./static/js/testimonials.js"></script>
```

**blog.html & contact.html** (Navigation only):

```html
<script src="../static/js/navigation.js"></script>
```

**login.html** (Tabs only):

```html
<script src="../static/js/tabs.js"></script>
```

## Benefits of Modular Structure

1. **Better Organization**: Each module handles a specific concern
2. **Improved Performance**: Pages only load needed JavaScript
3. **Easier Maintenance**: Changes to one feature don't affect others
4. **Better Testing**: Each module can be tested independently
5. **Code Reusability**: Modules can be used across different pages
6. **Reduced Complexity**: Smaller, focused files are easier to understand

## Module Dependencies

- **navigation.js**: No dependencies (standalone)
- **chat.js**: No dependencies (standalone)
- **testimonials.js**: No dependencies (standalone)
- **tabs.js**: No dependencies (standalone)

All modules are self-contained and don't require external libraries beyond Bootstrap (already loaded globally).

## Global Functions

For backward compatibility with inline event handlers, these functions are exposed globally:

- `window.scrollToTop()` - From navigation.js
- `window.toggleChatWindow()` - From chat.js
- `window.sendMessage()` - From chat.js
- `window.openTab(event, tabName)` - From tabs.js

## Auto-Initialization

All modules automatically initialize when the DOM is ready. No manual initialization required.

## Future Improvements

1. Bundle modules using Webpack or Vite for production
2. Add ES6 module syntax (import/export)
3. Implement lazy loading for non-critical modules
4. Add source maps for debugging
5. Minify and compress for production
6. Add unit tests for each module
