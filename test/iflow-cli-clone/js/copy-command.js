// Copy Command Module
// Handles copying commands to clipboard

(function() {
    'use strict';
    
    // DOM elements
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    // Initialize
    function init() {
        bindEvents();
    }
    
    // Copy text to clipboard
    async function copyToClipboard(text) {
        try {
            // Try using the Clipboard API
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
                return true;
            }
            
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                document.execCommand('copy');
                textArea.remove();
                return true;
            } catch (err) {
                textArea.remove();
                console.error('Fallback copy failed:', err);
                return false;
            }
        } catch (err) {
            console.error('Copy failed:', err);
            return false;
        }
    }
    
    // Show copy success feedback
    function showCopyFeedback(button) {
        const originalText = button.innerHTML;
        
        // Change button to show success state
        button.classList.add('copied');
        button.innerHTML = '<i class="fas fa-check"></i><span>Copied!</span>';
        
        // Revert after 2 seconds
        setTimeout(() => {
            button.classList.remove('copied');
            button.innerHTML = originalText;
        }, 2000);
    }
    
    // Handle copy button click
    async function handleCopyClick(e) {
        const button = e.currentTarget;
        const textToCopy = button.dataset.copy;
        
        if (!textToCopy) {
            console.warn('No text to copy found');
            return;
        }
        
        const success = await copyToClipboard(textToCopy);
        
        if (success) {
            showCopyFeedback(button);
        } else {
            // Show error feedback
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-times"></i><span>Failed</span>';
            setTimeout(() => {
                button.innerHTML = originalText;
            }, 2000);
        }
    }
    
    // Bind events
    function bindEvents() {
        copyButtons.forEach(button => {
            button.addEventListener('click', handleCopyClick);
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();