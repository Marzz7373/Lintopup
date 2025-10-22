// Terminal functionality
const terminalInput = document.getElementById('terminalInput');
const terminalOutput = document.getElementById('terminalOutput');

// Command database
const commands = {
    menu: {
        description: 'Show all available commands',
        execute: () => {
            return `
<div class="command-result">
<h4>Available Commands:</h4>
<br>
<strong>💎 Game Topup Commands:</strong>
• product - Show all available games
• list - Show game categories
• price [game] - Show prices for specific game
• tutor [game] - Show tutorial for game topup
<br>
<strong>📱 Social Media Commands:</strong>
• instagram - Instagram boost services
• facebook - Facebook boost services
• tiktok - TikTok boost services
• telegram - Telegram boost services
• youtube - YouTube boost services
• tutor socmed - Social media tutorial
<br>
<strong>🔑 Premium Apps Commands:</strong>
• app - Show premium apps/accounts
• tutor app - App tutorial
<br>
<strong>⚙️ Utility Commands:</strong>
• menu - Show this menu
• myinfo - Show your account info
• cekml [ID] [server] - Check Mobile Legends account
• cekmcgg [ID] [server] - Check Mobile Legends account
• cekff [ID] - Check Free Fire account
• cekhok [ID] - Check Honor of Kings account
• cekpubg [ID] - Check PUBG account
• cekrefill [order_id] - Check refill status
• status [order_id] - Check order status
</div>`;
        }
    },
    
    product: {
        description: 'Show available games',
        execute: () => {
            return `
<div class="command-result">
<h4>Available Games:</h4>
<br>
• Mobile Legends (mlbb)
• Free Fire (ff)
• PUBG Mobile (pubg)
• Honor of Kings (hok)
• Genshin Impact (genshin)
• Call of Duty Mobile (codm)
• Arena of Valor (aov)
• Clash of Clans (coc)
• Clash Royale (cr)
• Brawl Stars (bs)
<br>
Use: price [game] to see pricing
Example: price mlbb
</div>`;
        }
    },

    list: {
        description: 'Show game categories',
        execute: () => {
            return `
<div class="command-result">
<h4>Game Categories:</h4>
<br>
<strong>MOBA Games:</strong>
• Mobile Legends, Arena of Valor, Honor of Kings
<br>
<strong>Battle Royale:</strong>
• Free Fire, PUBG Mobile, Call of Duty Mobile
<br>
<strong>RPG Games:</strong>
• Genshin Impact
<br>
<strong>Strategy Games:</strong>
• Clash of Clans, Clash Royale, Brawl Stars
</div>`;
        }
    },

    instagram: {
        description: 'Instagram boost services',
        execute: () => {
            return `
<div class="command-result">
<h4>Instagram Boost Services:</h4>
<br>
• Followers: $5 - 1000 followers
• Likes: $3 - 1000 likes
• Views: $2 - 10000 views
• Comments: $4 - 100 comments
• Story Views: $1 - 5000 views
<br>
All services are high quality and safe!
Contact us to place an order.
</div>`;
        }
    },

    facebook: {
        description: 'Facebook boost services',
        execute: () => {
            return `
<div class="command-result">
<h4>Facebook Boost Services:</h4>
<br>
• Page Likes: $6 - 1000 likes
• Post Likes: $3 - 1000 likes
• Followers: $5 - 1000 followers
• Video Views: $2 - 10000 views
• Comments: $4 - 100 comments
<br>
High retention and real accounts guaranteed!
</div>`;
        }
    },

    tiktok: {
        description: 'TikTok boost services',
        execute: () => {
            return `
<div class="command-result">
<h4>TikTok Boost Services:</h4>
<br>
• Followers: $7 - 1000 followers
• Likes: $2 - 1000 likes
• Views: $1 - 10000 views
• Comments: $5 - 100 comments
• Shares: $3 - 500 shares
<br>
Fast delivery and high quality!
</div>`;
        }
    },

    telegram: {
        description: 'Telegram boost services',
        execute: () => {
            return `
<div class="command-result">
<h4>Telegram Boost Services:</h4>
<br>
• Channel Members: $8 - 1000 members
• Group Members: $6 - 1000 members
• Post Views: $1 - 10000 views
• Reactions: $2 - 1000 reactions
<br>
Real and active members only!
</div>`;
        }
    },

    youtube: {
        description: 'YouTube boost services',
        execute: () => {
            return `
<div class="command-result">
<h4>YouTube Boost Services:</h4>
<br>
• Subscribers: $10 - 1000 subscribers
• Views: $3 - 10000 views
• Likes: $2 - 1000 likes
• Comments: $5 - 100 comments
• Watch Time: $15 - 4000 hours
<br>
Safe and compliant with YouTube policies!
</div>`;
        }
    },

    app: {
        description: 'Premium apps and accounts',
        execute: () => {
            return `
<div class="command-result">
<h4>Premium Apps & Accounts:</h4>
<br>
<strong>Streaming:</strong>
• Netflix Premium - $5/month
• Spotify Premium - $3/month
• Disney+ - $4/month
• YouTube Premium - $3/month
<br>
<strong>Productivity:</strong>
• Microsoft Office 365 - $8/month
• Adobe Creative Suite - $12/month
• Canva Pro - $2/month
<br>
<strong>VPN Services:</strong>
• NordVPN - $3/month
• ExpressVPN - $4/month
<br>
All accounts are private and guaranteed!
</div>`;
        }
    },

    myinfo: {
        description: 'Show account information',
        execute: () => {
            const user = getCurrentUser();
            if (!user) {
                return `
<div class="command-result">
<span style="color: #ff4444;">Please login to view account information.</span>
</div>`;
            }
            return `
<div class="command-result">
<h4>Account Information:</h4>
<br>
• Username: ${user.username}
• Email: ${user.email}
• Balance: $${user.balance.toFixed(2)}
• Member Since: ${user.joinDate}
• Total Orders: ${user.totalOrders || 0}
• Status: ${user.status || 'Active'}
</div>`;
        }
    }
};

// Price commands for games
const gamePrices = {
    mlbb: {
        name: 'Mobile Legends',
        prices: [
            { diamonds: '86 Diamonds', price: '$2.00' },
            { diamonds: '172 Diamonds', price: '$3.50' },
            { diamonds: '257 Diamonds', price: '$5.00' },
            { diamonds: '344 Diamonds', price: '$6.50' },
            { diamonds: '344 Diamonds', price: '$6.50' },
            { diamonds: '429 Diamonds', price: '$8.00' },
            { diamonds: '514 Diamonds', price: '$9.50' },
            { diamonds: '706 Diamonds', price: '$12.00' },
            { diamonds: '878 Diamonds', price: '$15.00' }
        ]
    },
    ff: {
        name: 'Free Fire',
        prices: [
            { diamonds: '100 Diamonds', price: '$1.50' },
            { diamonds: '210 Diamonds', price: '$3.00' },
            { diamonds: '355 Diamonds', price: '$5.00' },
            { diamonds: '720 Diamonds', price: '$10.00' },
            { diamonds: '1450 Diamonds', price: '$20.00' },
            { diamonds: '2180 Diamonds', price: '$30.00' },
            { diamonds: '3640 Diamonds', price: '$50.00' },
            { diamonds: '7290 Diamonds', price: '$100.00' }
        ]
    },
    pubg: {
        name: 'PUBG Mobile',
        prices: [
            { diamonds: '60 UC', price: '$1.00' },
            { diamonds: '325 UC', price: '$5.00' },
            { diamonds: '660 UC', price: '$10.00' },
            { diamonds: '1800 UC', price: '$25.00' },
            { diamonds: '3850 UC', price: '$50.00' },
            { diamonds: '8100 UC', price: '$100.00' }
        ]
    },
    hok: {
        name: 'Honor of Kings',
        prices: [
            { diamonds: '60 Tokens', price: '$1.00' },
            { diamonds: '300 Tokens', price: '$5.00' },
            { diamonds: '980 Tokens', price: '$15.00' },
            { diamonds: '1980 Tokens', price: '$30.00' },
            { diamonds: '3280 Tokens', price: '$50.00' },
            { diamonds: '6480 Tokens', price: '$100.00' }
        ]
    },
    genshin: {
        name: 'Genshin Impact',
        prices: [
            { diamonds: '60 Genesis Crystals', price: '$1.00' },
            { diamonds: '300 Genesis Crystals', price: '$5.00' },
            { diamonds: '980 Genesis Crystals', price: '$15.00' },
            { diamonds: '1980 Genesis Crystals', price: '$30.00' },
            { diamonds: '3280 Genesis Crystals', price: '$50.00' },
            { diamonds: '6480 Genesis Crystals', price: '$100.00' }
        ]
    }
};

// Tutorial commands
const tutorials = {
    'tutor mlbb': () => `
<div class="command-result">
<h4>Mobile Legends Topup Tutorial:</h4>
<br>
<strong>Step 1:</strong> Find your User ID and Server ID
• Open Mobile Legends
• Tap your avatar (top left)
• Your ID will be displayed
<br>
<strong>Step 2:</strong> Choose your diamond package
• Use command: price mlbb
• Select desired amount
<br>
<strong>Step 3:</strong> Place order
• Contact us with your ID and package
• Make payment
• Diamonds will be delivered within 5 minutes
<br>
<strong>Important:</strong> Make sure your account is not logged in during topup!
</div>`,
    
    'tutor ff': () => `
<div class="command-result">
<h4>Free Fire Topup Tutorial:</h4>
<br>
<strong>Step 1:</strong> Get your Player ID
• Open Free Fire
• Tap your profile icon
• Copy your Player ID
<br>
<strong>Step 2:</strong> Select diamond package
• Use: price ff
• Choose amount needed
<br>
<strong>Step 3:</strong> Complete order
• Send us your Player ID
• Make payment
• Diamonds delivered instantly
<br>
<strong>Note:</strong> No need to provide password, only Player ID required!
</div>`,

    'tutor socmed': () => `
<div class="command-result">
<h4>Social Media Boost Tutorial:</h4>
<br>
<strong>Step 1:</strong> Choose service
• instagram, facebook, tiktok, telegram, youtube
<br>
<strong>Step 2:</strong> Provide link/username
• Send us your profile link or username
• Make sure profile is public
<br>
<strong>Step 3:</strong> Select package
• Choose followers, likes, views, etc.
• Make payment
<br>
<strong>Step 4:</strong> Delivery
• Services start within 1-24 hours
• Gradual delivery for safety
<br>
<strong>Important:</strong> Keep your account public during service delivery!
</div>`,

    'tutor app': () => `
<div class="command-result">
<h4>Premium Apps Tutorial:</h4>
<br>
<strong>Step 1:</strong> Choose your app
• Use command: app
• Select desired service
<br>
<strong>Step 2:</strong> Account details
• We provide login credentials
• Or upgrade your existing account
<br>
<strong>Step 3:</strong> Payment & delivery
• Make payment
• Receive account details within 1 hour
<br>
<strong>Security:</strong>
• All accounts are private
• Change password after receiving
• 30-day replacement guarantee
</div>`
};

// Check commands for game accounts
const checkCommands = {
    cekml: (args) => {
        if (args.length < 2) {
            return `
<div class="command-result">
<span style="color: #ff4444;">Usage: cekml [USER_ID] [SERVER_ID]</span>
<br>Example: cekml 123456789 1234
</div>`;
        }
        return `
<div class="command-result">
<h4>Mobile Legends Account Check:</h4>
<br>
• User ID: ${args[0]}
• Server ID: ${args[1]}
• Username: Player${args[0].slice(-4)}
• Level: ${Math.floor(Math.random() * 50) + 10}
• Rank: Epic ${Math.floor(Math.random() * 5) + 1}
• Status: ✅ Valid Account
</div>`;
    },

    cekmcgg: (args) => {
        if (args.length < 2) {
            return `
<div class="command-result">
<span style="color: #ff4444;">Usage: cekmcgg [USER_ID] [SERVER_ID]</span>
<br>Example: cekmcgg 123456789 1234
</div>`;
        }
        return `
<div class="command-result">
<h4>Mobile Legends Account Check:</h4>
<br>
• User ID: ${args[0]}
• Server ID: ${args[1]}
• Username: Gamer${args[0].slice(-4)}
• Level: ${Math.floor(Math.random() * 60) + 15}
• Rank: Legend ${Math.floor(Math.random() * 5) + 1}
• Status: ✅ Valid Account
</div>`;
    },

    cekff: (args) => {
        if (args.length < 1) {
            return `
<div class="command-result">
<span style="color: #ff4444;">Usage: cekff [PLAYER_ID]</span>
<br>Example: cekff 123456789
</div>`;
        }
        return `
<div class="command-result">
<h4>Free Fire Account Check:</h4>
<br>
• Player ID: ${args[0]}
• Username: FF${args[0].slice(-4)}
• Level: ${Math.floor(Math.random() * 70) + 10}
• Rank: Heroic
• Status: ✅ Valid Account
</div>`;
    },

    cekhok: (args) => {
        if (args.length < 1) {
            return `
<div class="command-result">
<span style="color: #ff4444;">Usage: cekhok [PLAYER_ID]</span>
<br>Example: cekhok 123456789
</div>`;
        }
        return `
<div class="command-result">
<h4>Honor of Kings Account Check:</h4>
<br>
• Player ID: ${args[0]}
• Username: King${args[0].slice(-4)}
• Level: ${Math.floor(Math.random() * 50) + 20}
• Rank: Diamond
• Status: ✅ Valid Account
</div>`;
    },

    cekpubg: (args) => {
        if (args.length < 1) {
            return `
<div class="command-result">
<span style="color: #ff4444;">Usage: cekpubg [PLAYER_ID]</span>
<br>Example: cekpubg 123456789
</div>`;
        }
        return `
<div class="command-result">
<h4>PUBG Mobile Account Check:</h4>
<br>
• Player ID: ${args[0]}
• Username: PUBG${args[0].slice(-4)}
• Level: ${Math.floor(Math.random() * 80) + 10}
• Tier: Crown
• Status: ✅ Valid Account
</div>`;
    },

    cekrefill: (args) => {
        if (args.length < 1) {
            return `
<div class="command-result">
<span style="color: #ff4444;">Usage: cekrefill [ORDER_ID]</span>
<br>Example: cekrefill ORD123456
</div>`;
        }
        const statuses = ['Processing', 'Completed', 'Pending', 'In Progress'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        return `
<div class="command-result">
<h4>Refill Status Check:</h4>
<br>
• Order ID: ${args[0]}
• Status: ${randomStatus}
• Service: Diamond Topup
• Amount: 344 Diamonds
• Progress: ${Math.floor(Math.random() * 100)}%
• ETA: ${Math.floor(Math.random() * 30) + 1} minutes
</div>`;
    },

    status: (args) => {
        if (args.length < 1) {
            return `
<div class="command-result">
<span style="color: #ff4444;">Usage: status [ORDER_ID]</span>
<br>Example: status ORD123456
</div>`;
        }
        const statuses = ['Completed', 'Processing', 'Pending Payment', 'Delivered'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        return `
<div class="command-result">
<h4>Order Status:</h4>
<br>
• Order ID: ${args[0]}
• Status: ${randomStatus}
• Date: ${new Date().toLocaleDateString()}
• Service: Game Topup
• Amount: $5.00
• Delivery: ${randomStatus === 'Completed' ? 'Delivered' : 'In Progress'}
</div>`;
    }
};

// Execute command function
function executeCommand(commandText) {
    const args = commandText.trim().split(' ');
    const command = args[0].toLowerCase();
    const commandArgs = args.slice(1);

    // Add command to terminal
    addToTerminal(`> ${commandText}`, 'command-line');

    let result = '';

    // Handle price commands
    if (command === 'price' && commandArgs.length > 0) {
        const game = commandArgs[0].toLowerCase();
        if (gamePrices[game]) {
            const gameData = gamePrices[game];
            result = `
<div class="command-result">
<h4>${gameData.name} Prices:</h4>
<br>
${gameData.prices.map(item => `• ${item.diamonds} - ${item.price}`).join('<br>')}
<br><br>
Contact us to place an order!
</div>`;
        } else {
            result = `
<div class="command-result">
<span style="color: #ff4444;">Game not found. Use 'product' to see available games.</span>
</div>`;
        }
    }
    // Handle tutorial commands
    else if (commandText.toLowerCase().startsWith('tutor ')) {
        const tutorialKey = commandText.toLowerCase();
        if (tutorials[tutorialKey]) {
            result = tutorials[tutorialKey]();
        } else {
            result = `
<div class="command-result">
<span style="color: #ff4444;">Tutorial not found. Available: tutor mlbb, tutor ff, tutor socmed, tutor app</span>
</div>`;
        }
    }
    // Handle check commands
    else if (checkCommands[command]) {
        result = checkCommands[command](commandArgs);
    }
    // Handle basic commands
    else if (commands[command]) {
        result = commands[command].execute();
    }
    // Unknown command
    else {
        result = `
<div class="command-result">
<span style="color: #ff4444;">Unknown command: ${command}</span>
<br>Type 'menu' to see available commands.
</div>`;
    }

    addToTerminal(result, 'command-result');
    
    // Clear input
    terminalInput.value = '';
    
    // Scroll to bottom
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Add content to terminal
function addToTerminal(content, className) {
    const div = document.createElement('div');
    div.className = className;
    div.innerHTML = content;
    terminalOutput.appendChild(div);
}

// Terminal input event listener
terminalInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const command = this.value.trim();
        if (command) {
            executeCommand(command);
        }
    }
});

// Modal functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function openLoginModal() {
    openModal('loginModal');
}

function openRegisterModal() {
    openModal('registerModal');
}

function openTopupModal() {
    openModal('topupModal');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Top up amount selection
function selectAmount(amount) {
    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
    document.getElementById('customAmount').value = amount;
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    checkAuthStatus();
    
    // Focus terminal input
    terminalInput.focus();
});
