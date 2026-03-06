// Terminal Demo Module
// Handles terminal animation and interaction

(function() {
    'use strict';
    
    // Terminal commands sequence
    const commands = [
        {
            prompt: '$ iflow init',
            output: '✓ Initialized iFlow project',
            type: 'success'
        },
        {
            prompt: '$ iflow create --component Button',
            output: '✓ Created Button component',
            type: 'success'
        },
        {
            prompt: '$ iflow test',
            output: '✓ All tests passed',
            type: 'success'
        },
        {
            prompt: '$ iflow deploy',
            output: '✓ Deployed successfully',
            type: 'success'
        }
    ];
    
    // DOM elements
    const terminalBody = document.getElementById('terminalBody');
    
    // Animation state
    let animationDelay = 1000;
    let commandIndex = 0;
    let isAnimating = false;
    
    // Initialize
    function init() {
        // Check if terminal exists
        if (!terminalBody) {
            console.warn('Terminal body not found');
            return;
        }
        
        // Start animation after a delay
        setTimeout(() => {
            startAnimation();
        }, 2000);
        
        // Auto-restart animation periodically
        setInterval(() => {
            if (!isAnimating) {
                resetTerminal();
                setTimeout(() => {
                    startAnimation();
                }, 1000);
            }
        }, 30000);
    }
    
    // Reset terminal to initial state
    function resetTerminal() {
        if (!terminalBody) return;
        
        terminalBody.innerHTML = `
            <div class="terminal-line">
                <span class="terminal-prompt">$ <span class="terminal-cursor"></span></span>
            </div>
        `;
        
        commandIndex = 0;
        isAnimating = false;
    }
    
    // Start terminal animation
    async function startAnimation() {
        if (isAnimating) return;
        isAnimating = true;
        
        // Clear terminal
        terminalBody.innerHTML = '';
        
        // Animate each command
        for (let i = 0; i < commands.length; i++) {
            await typeCommand(commands[i]);
            await sleep(animationDelay);
        }
        
        // Add final prompt with cursor
        addPrompt();
        
        isAnimating = false;
    }
    
    // Type a command
    async function typeCommand(command) {
        // Create command line
        const commandLine = document.createElement('div');
        commandLine.className = 'terminal-line';
        commandLine.innerHTML = `<span class="terminal-prompt">$ <span class="terminal-input"></span><span class="terminal-cursor"></span></span>`;
        terminalBody.appendChild(commandLine);
        
        const inputSpan = commandLine.querySelector('.terminal-input');
        const cursorSpan = commandLine.querySelector('.terminal-cursor');
        
        // Type the command character by character
        const text = command.prompt.substring(2); // Remove '$ ' prefix
        for (let i = 0; i < text.length; i++) {
            inputSpan.textContent += text[i];
            await sleep(50);
            scrollToBottom();
        }
        
        // Remove cursor
        if (cursorSpan) {
            cursorSpan.remove();
        }
        
        // Add output
        await sleep(200);
        const outputLine = document.createElement('div');
        outputLine.className = `terminal-${command.type || 'output'}`;
        outputLine.textContent = command.output;
        terminalBody.appendChild(outputLine);
        
        scrollToBottom();
    }
    
    // Add final prompt
    function addPrompt() {
        const promptLine = document.createElement('div');
        promptLine.className = 'terminal-line';
        promptLine.innerHTML = `<span class="terminal-prompt">$ <span class="terminal-cursor"></span></span>`;
        terminalBody.appendChild(promptLine);
        scrollToBottom();
    }
    
    // Scroll terminal to bottom
    function scrollToBottom() {
        if (terminalBody) {
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    }
    
    // Sleep utility
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();