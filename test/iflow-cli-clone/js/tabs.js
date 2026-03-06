// Tabs Module
// Handles tab switching functionality

(function() {
    'use strict';
    
    // DOM elements
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Initialize
    function init() {
        bindEvents();
    }
    
    // Switch to specific tab
    function switchTab(tabName) {
        // Remove active class from all buttons and contents
        tabButtons.forEach(button => {
            button.classList.remove('active');
        });
        
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Add active class to selected button and content
        const targetButton = document.querySelector(`.tab-btn[data-tab="${tabName}"]`);
        const targetContent = document.getElementById(`${tabName}-content`);
        
        if (targetButton) {
            targetButton.classList.add('active');
        }
        
        if (targetContent) {
            targetContent.classList.add('active');
        }
    }
    
    // Handle tab button click
    function handleTabClick(e) {
        const button = e.currentTarget;
        const tabName = button.dataset.tab;
        
        if (tabName) {
            switchTab(tabName);
        }
    }
    
    // Bind events
    function bindEvents() {
        tabButtons.forEach(button => {
            button.addEventListener('click', handleTabClick);
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();