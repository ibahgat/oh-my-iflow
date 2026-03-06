// Language Switcher Module
// Handles language switching between Chinese and English

(function() {
    'use strict';
    
    // Language data
    const translations = {
        zh: {
            'hero.title': 'iFlow CLI',
            'hero.subtitle': '效率，从心流开始',
            'copy': '复制',
            'integration.title': '无缝集成到你的环境',
            'integration.subtitle': '既可在你喜欢的开发工具中直接使用，也可集成到现有系统实现自动化',
            'features.title': '产品亮点',
            'features.subtitle': '汇集前沿AI模型，重塑研发范式',
            'features.feature1.title': '免费的前沿模型',
            'features.feature1.description': '畅享心流开放平台，零成本体验 Kimi K2、Qwen3 Coder、GLM4.5 等业界最新模型，让先进技术触手可及。',
            'features.feature2.title': '多智能体协作',
            'features.feature2.description': '复杂任务智能分解，专业智能体并发协作，独立上下文避免干扰，瞬间拥有一支全能专家团队。',
            'features.feature3.title': '开放智能体生态',
            'features.feature3.description': '汇聚社区智慧结晶，精选安全认证的 MCP 市场与智能体商店，创作如搭积木般简单直观。',
            'features.feature4.title': '自然语言交互',
            'features.feature4.description': '告别复杂命令，用日常对话驱动 AI，从代码开发到生活助理，一句话解决所有需求。',
            'ide.title': '为主流 IDE 定制的插件',
            'ide.subtitle': '无缝集成到你熟悉的开发环境中，提升开发效率',
            'ide.vscode.step1.title': '打开 VSCode 扩展市场',
            'ide.vscode.step1.description': '在 VSCode 中按下 Ctrl+Shift+X 打开扩展面板',
            'ide.vscode.step2.title': '搜索 iFlow 插件',
            'ide.vscode.step2.description': '在搜索框中输入 "iFlow" 并找到官方插件',
            'ide.vscode.step3.title': '点击安装',
            'ide.vscode.step3.description': '点击安装按钮，等待插件下载并安装完成',
            'ide.vscode.step4.title': '重启 VSCode',
            'ide.vscode.step4.description': '重启 VSCode 使插件生效，开始使用',
            'ide.jetbrains.step1.title': '打开插件设置',
            'ide.jetbrains.step1.description': '在 JetBrains IDE 中进入 File → Settings → Plugins',
            'ide.jetbrains.step2.title': '搜索 Marketplace',
            'ide.jetbrains.step2.description': '在 Marketplace 中搜索 "iFlow" 插件',
            'ide.jetbrains.step3.title': '安装插件',
            'ide.jetbrains.step3.description': '点击 Install 按钮安装插件',
            'ide.jetbrains.step4.title': '重启 IDE',
            'ide.jetbrains.step4.description': '重启 IDE 使插件生效',
            'footer.product': '产品',
            'footer.developers': '开发者',
            'footer.support': '支持'
        },
        en: {
            'hero.title': 'iFlow CLI',
            'hero.subtitle': 'Efficiency starts with flow',
            'copy': 'Copy',
            'integration.title': 'Seamlessly integrate into your environment',
            'integration.subtitle': 'Use directly in your favorite development tools or integrate into existing systems for automation',
            'features.title': 'Product Highlights',
            'features.subtitle': 'Gather cutting-edge AI models, reshape development paradigm',
            'features.feature1.title': 'Free cutting-edge models',
            'features.feature1.description': 'Enjoy the Flow open platform for free, experience the latest industry models like Kimi K2, Qwen3 Coder, GLM4.5 at zero cost, making advanced technology accessible.',
            'features.feature2.title': 'Multi-agent collaboration',
            'features.feature2.description': 'Intelligent decomposition of complex tasks, concurrent collaboration by professional agents, independent context avoiding interference, instantly owning a full-featured expert team.',
            'features.feature3.title': 'Open agent ecosystem',
            'features.feature3.description': 'Gather the crystallization of community wisdom, select security-certified MCP market and agent store, creation as simple and intuitive as building blocks.',
            'features.feature4.title': 'Natural language interaction',
            'features.feature4.description': 'Say goodbye to complex commands, drive AI with daily conversation, from code development to life assistant, solve all needs with one sentence.',
            'ide.title': 'Plugins customized for mainstream IDEs',
            'ide.subtitle': 'Seamlessly integrate into your familiar development environment to improve development efficiency',
            'ide.vscode.step1.title': 'Open VSCode Extension Market',
            'ide.vscode.step1.description': 'Press Ctrl+Shift+X in VSCode to open the extension panel',
            'ide.vscode.step2.title': 'Search for iFlow plugin',
            'ide.vscode.step2.description': 'Enter "iFlow" in the search box and find the official plugin',
            'ide.vscode.step3.title': 'Click Install',
            'ide.vscode.step3.description': 'Click the install button and wait for the plugin to download and install',
            'ide.vscode.step4.title': 'Restart VSCode',
            'ide.vscode.step4.description': 'Restart VSCode to activate the plugin and start using',
            'ide.jetbrains.step1.title': 'Open plugin settings',
            'ide.jetbrains.step1.description': 'Go to File → Settings → Plugins in JetBrains IDE',
            'ide.jetbrains.step2.title': 'Search Marketplace',
            'ide.jetbrains.step2.description': 'Search for "iFlow" plugin in Marketplace',
            'ide.jetbrains.step3.title': 'Install plugin',
            'ide.jetbrains.step3.description': 'Click Install button to install the plugin',
            'ide.jetbrains.step4.title': 'Restart IDE',
            'ide.jetbrains.step4.description': 'Restart IDE to activate the plugin',
            'footer.product': 'Product',
            'footer.developers': 'Developers',
            'footer.support': 'Support'
        }
    };
    
    // DOM elements
    const languageBtn = document.getElementById('languageBtn');
    const languageDropdown = document.getElementById('languageDropdown');
    const currentLangSpan = document.getElementById('currentLang');
    const languageOptions = document.querySelectorAll('.language-option');
    
    // Current language (default: Chinese)
    let currentLang = localStorage.getItem('iflow-language') || 'zh';
    
    // Initialize
    function init() {
        updateLanguageDisplay();
        updatePageContent();
        bindEvents();
    }
    
    // Update language display in button
    function updateLanguageDisplay() {
        if (currentLangSpan) {
            currentLangSpan.textContent = currentLang === 'zh' ? '中文' : 'English';
        }
        
        // Update active state in dropdown
        languageOptions.forEach(option => {
            if (option.dataset.lang === currentLang) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }
    
    // Update page content based on current language
    function updatePageContent() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.dataset.i18n;
            if (translations[currentLang] && translations[currentLang][key]) {
                element.textContent = translations[currentLang][key];
            }
        });
    }
    
    // Switch language
    function switchLanguage(lang) {
        if (lang === currentLang) return;
        
        currentLang = lang;
        localStorage.setItem('iflow-language', lang);
        
        updateLanguageDisplay();
        updatePageContent();
        closeDropdown();
    }
    
    // Toggle dropdown
    function toggleDropdown() {
        languageDropdown.classList.toggle('active');
    }
    
    // Close dropdown
    function closeDropdown() {
        languageDropdown.classList.remove('active');
    }
    
    // Bind events
    function bindEvents() {
        // Toggle dropdown on button click
        if (languageBtn) {
            languageBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleDropdown();
            });
        }
        
        // Handle language option clicks
        languageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const lang = option.dataset.lang;
                switchLanguage(lang);
            });
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.language-switcher')) {
                closeDropdown();
            }
        });
        
        // Close dropdown on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeDropdown();
            }
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();