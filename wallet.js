// E-wallet functionality

// Process top up
function processTopup() {
    if (!currentUser) {
        showNotification('Please login first!', 'error');
        return;
    }
    
    const customAmount = document.getElementById('customAmount').value;
    const selectedAmount = document.querySelector('.amount-btn.selected');
    
    let amount = 0;
    if (customAmount && parseFloat(customAmount) > 0) {
        amount = parseFloat(customAmount);
    } else if (selectedAmount) {
        amount = parseFloat(selectedAmount.textContent.replace('$', ''));
    } else {
        showNotification('Please select or enter an amount!', 'error');
        return;
    }
    
    if (amount < 1) {
        showNotification('Minimum top up amount is $1!', 'error');
        return;
    }
    
    // Simulate payment processing
    showNotification('Processing payment...', 'success');
    
    setTimeout(() => {
        // Add amount to user balance
        currentUser.balance += amount;
        
        // Update user in storage
        const users = JSON.parse(localStorage.getItem('linndiamonds_users') || '[]');
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
            users[userIndex] = currentUser;
            localStorage.setItem('linndiamonds_users', JSON.stringify(users));
        }
        localStorage.setItem('linndiamonds_currentUser', JSON.stringify(currentUser));
        
        // Update UI
        updateAuthUI();
        closeModal('topupModal');
        
        // Add transaction to history
        addTransaction({
            type: 'topup',
            amount: amount,
            description: 'Wallet Top Up',
            date: new Date().toISOString(),
            status: 'completed'
        });
        
        showNotification(`Successfully added $${amount.toFixed(2)} to your wallet!`, 'success');
        
        // Reset form
        document.getElementById('customAmount').value = '';
        document.querySelectorAll('.amount-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
    }, 2000);
}

// Add transaction to history
function addTransaction(transaction) {
    if (!currentUser) return;
    
    let transactions = JSON.parse(localStorage.getItem(`transactions_${currentUser.id}`) || '[]');
    transactions.unshift({
        id: Date.now(),
        ...transaction
    });
    
    // Keep only last 50 transactions
    if (transactions.length > 50) {
        transactions = transactions.slice(0, 50);
    }
    
    localStorage.setItem(`transactions_${currentUser.id}`, JSON.stringify(transactions));
}

// Get user transactions
function getUserTransactions() {
    if (!currentUser) return [];
    return JSON.parse(localStorage.getItem(`transactions_${currentUser.id}`) || '[]');
}

// Process purchase
function processPurchase(service, amount, description) {
    if (!currentUser) {
        showNotification('Please login first!', 'error');
        return false;
    }
    
    if (currentUser.balance < amount) {
        showNotification('Insufficient balance! Please top up your wallet.', 'error');
        return false;
    }
    
    // Deduct amount from balance
    currentUser.balance -= amount;
    
    // Update user in storage
    const users = JSON.parse(localStorage.getItem('linndiamonds_users') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        users[userIndex].totalOrders = (users[userIndex].totalOrders || 0) + 1;
        localStorage.setItem('linndiamonds_users', JSON.stringify(users));
    }
    localStorage.setItem('linndiamonds_currentUser', JSON.stringify(currentUser));
    
    // Update UI
    updateAuthUI();
    
    // Add transaction to history
    addTransaction({
        type: 'purchase',
        amount: -amount,
        description: description,
        service: service,
        date: new Date().toISOString(),
        status: 'completed'
    });
    
    showNotification(`Purchase successful! $${amount.toFixed(2)} deducted from wallet.`, 'success');
    return true;
}

// Get wallet balance
function getWalletBalance() {
    return currentUser ? currentUser.balance : 0;
}

// Format currency
function formatCurrency(amount) {
    return `$${amount.toFixed(2)}`;
}

// Wallet history command
commands.wallet = {
    description: 'Show wallet transactions',
    execute: () => {
        if (!currentUser) {
            return `
<div class="command-result">
<span style="color: #ff4444;">Please login to view wallet history.</span>
</div>`;
        }
        
        const transactions = getUserTransactions();
        if (transactions.length === 0) {
            return `
<div class="command-result">
<h4>Wallet History:</h4>
<br>
No transactions found.
</div>`;
        }
        
        const transactionList = transactions.slice(0, 10).map(t => {
            const color = t.amount > 0 ? '#4CAF50' : '#ff4444';
            const sign = t.amount > 0 ? '+' : '';
            return `• ${new Date(t.date).toLocaleDateString()} - ${t.description} - <span style="color: ${color}">${sign}$${Math.abs(t.amount).toFixed(2)}</span>`;
        }).join('<br>');
        
        return `
<div class="command-result">
<h4>Wallet History:</h4>
<br>
<strong>Current Balance: $${currentUser.balance.toFixed(2)}</strong>
<br><br>
<strong>Recent Transactions:</strong>
<br>
${transactionList}
<br><br>
Showing last 10 transactions.
</div>`;
    }
};

// Balance command
commands.balance = {
    description: 'Show current wallet balance',
    execute: () => {
        if (!currentUser) {
            return `
<div class="command-result">
<span style="color: #ff4444;">Please login to view balance.</span>
</div>`;
        }
        
        return `
<div class="command-result">
<h4>Wallet Balance:</h4>
<br>
<strong style="color: #4CAF50; font-size: 1.2em;">$${currentUser.balance.toFixed(2)}</strong>
<br><br>
Use 'wallet' command to see transaction history.
</div>`;
    }
};
