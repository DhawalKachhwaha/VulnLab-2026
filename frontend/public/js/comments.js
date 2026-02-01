/**
•	VulnLab-2026 Comments Module
•	Intentionally vulnerable to Stored XSS (CVE-2025-13861)
•	Uses innerHTML without sanitization for educational purposes
*/
(function() {
'use strict';
// Configuration
const CONFIG = {
    API_BASE: 'http://localhost:3000/api/comments',
    POST_ID: 1, // Default blog post ID
    RETRY_DELAY: 2000,
    MAX_RETRIES: 3
};

// DOM Elements
let form, nameInput, textInput, commentsList;
let retryCount = 0;

/**
 * Initialize the comments module
 */
function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setup);
    } else {
        setup();
    }
}

/**
 * Setup DOM elements and event listeners
 */
function setup() {
    // Get DOM elements
    form = document.getElementById('comment-form');
    nameInput = document.getElementById('comment-name');
    textInput = document.getElementById('comment-text');
    commentsList = document.getElementById('comments-list');

    // Validate elements exist
    if (!form || !nameInput || !textInput || !commentsList) {
        console.error('[Comments] Required DOM elements not found');
        return;
    }

    // Attach event listeners
    form.addEventListener('submit', handleSubmit);

    // Load initial comments
    fetchComments();
}

/**
 * Fetch comments from the backend API
 */
async function fetchComments() {
    try {
        showLoading();

        const response = await fetch(CONFIG.API_BASE, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        const comments = Array.isArray(data) ? data : data.comments || [];
        
        renderComments(comments);
        retryCount = 0; // Reset retry counter on success

    } catch (error) {
        console.error('[Comments] Fetch error:', error);
        handleFetchError(error);
    }
}

/**
 * Handle comment form submission
 */
async function handleSubmit(event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const text = textInput.value.trim();

    // Basic validation
    if (!name || !text) {
        showMessage('Please fill in all fields', 'error');
        return;
    }

    if (name.length > 50) {
        showMessage('Name too long (max 50 characters)', 'error');
        return;
    }

    if (text.length > 500) {
        showMessage('Comment too long (max 500 characters)', 'error');
        return;
    }

    try {
        // Disable form during submission
        setFormState(false);

        const payload = {
            name: name,
            text: text,
            postId: CONFIG.POST_ID
        };

        const response = await fetch(CONFIG.API_BASE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP ${response.status}`);
        }

        const result = await response.json();

        // Clear form
        nameInput.value = '';
        textInput.value = '';

        // Show success message
        showMessage('Comment posted successfully!', 'success');

        // Refresh comments list
        await fetchComments();

    } catch (error) {
        console.error('[Comments] Submit error:', error);
        showMessage('Failed to post comment. Please try again.', 'error');
    } finally {
        // Re-enable form
        setFormState(true);
    }
}

/**
 * Render comments to the DOM
 * Uses safe DOM manipulation to prevent XSS attacks
 */
function renderComments(comments) {
    if (!comments || comments.length === 0) {
        commentsList.innerHTML = '';
        const emptyDiv = document.createElement('div');
        emptyDiv.className = 'empty-state';
        emptyDiv.textContent = 'No comments yet. Be the first to comment!';
        commentsList.appendChild(emptyDiv);
        return;
    }

    // Clear existing content
    commentsList.innerHTML = '';

    // Render each comment
    comments.forEach((comment, index) => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment-item';

        // Create name element
        const nameElement = document.createElement('strong');
        nameElement.textContent = comment.name;

        // Create text element
        const textElement = document.createElement('p');
        textElement.textContent = comment.text;

        // Create date element
        const dateElement = document.createElement('small');
        dateElement.textContent = formatDate(comment.createdAt || comment.created_at || new Date().toISOString());

        // Append elements safely
        commentDiv.appendChild(nameElement);
        commentDiv.appendChild(textElement);
        commentDiv.appendChild(dateElement);

        // Add divider if not the last comment
        if (index < comments.length - 1) {
            const divider = document.createElement('div');
            divider.className = 'comment-divider';
            commentDiv.appendChild(divider);
        }

        commentsList.appendChild(commentDiv);
    });
}

/**
 * Format date for display
 */
function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
        
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        
        const diffDays = Math.floor(diffHours / 24);
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch (error) {
        return 'Unknown date';
    }
}

/**
 * Show loading state
 */
function showLoading() {
    if (commentsList) {
        commentsList.innerHTML = '<div class="loading">Loading comments...</div>';
    }
}

/**
 * Handle fetch errors with retry logic
 */
function handleFetchError(error) {
    if (retryCount < CONFIG.MAX_RETRIES) {
        retryCount++;
        console.log(`[Comments] Retrying... (${retryCount}/${CONFIG.MAX_RETRIES})`);
        setTimeout(fetchComments, CONFIG.RETRY_DELAY);
    } else {
        const errorMsg = error.message === 'Failed to fetch' 
            ? 'Backend API server is not running. Please start the API server on localhost:3000'
            : error.message;
        
        commentsList.innerHTML = '';
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        const errorText = document.createElement('div');
        errorText.textContent = 'Failed to load comments. Please refresh the page.';
        const errorDetail = document.createElement('small');
        errorDetail.textContent = `Error: ${errorMsg}`;
        
        errorDiv.appendChild(errorText);
        errorDiv.appendChild(document.createElement('br'));
        errorDiv.appendChild(errorDetail);
        commentsList.appendChild(errorDiv);
    }
}

/**
 * Show temporary message to user
 */
function showMessage(text, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message`;
    messageDiv.textContent = text;

    form.parentElement.insertBefore(messageDiv, form);

    setTimeout(() => {
        messageDiv.remove();
    }, 4000);
}

/**
 * Enable/disable form inputs
 */
function setFormState(enabled) {
    const submitBtn = form.querySelector('button[type="submit"]');
    
    nameInput.disabled = !enabled;
    textInput.disabled = !enabled;
    submitBtn.disabled = !enabled;
    submitBtn.textContent = enabled ? 'Post Comment' : 'Posting...';
}

// Initialize when script loads
init();

})();
