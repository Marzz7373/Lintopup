// Authentication system
let currentUser = null;

// Mock user database (in real app, this would be server-side)
let users = JSON.parse(localStorage.getItem('linndiamonds_users') || '[]');

// Login form handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Find user
    const user = users.find(u => 
        (u.email === email || u.username === email) && u.password === password
    );
    
    if (user) {
        currentUser = user;
        localStorage.setItem('linndiamonds_currentUser', JSON.stringify(user));
        updateAuthUI();
        closeModal('loginModal');
        showNotification('Login successful!', 'success');
    } else {
        showNotification('Invalid credentials!', 'error');
    }
});

// Register form handler
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    
    // Validation
    if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }
    
    if (users.find(u => u.email === email || u.username === username)) {
        showNotification('User already exists!', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        username: username,
        email: email,
        password: password, // In real app, this should be hashed
        balance: 0.00,
        joinDate: new Date().toLocaleDateString(),
        totalOrders: 0,
        status: 'Active'
    };
    
    users.push(newUser);
    localStorage.setItem('linndiamonds_users', JSON.stringify(users));
    
    currentUser = newUser;
    localStorage.setItem('linndiamonds_currentUser', JSON.stringify(newUser));
    
    updateAuthUI();
    closeModal('registerModal');
    showNotification('Account created successfully!', 'success');
});

// Logout function
function logout() {
    currentUser = null;
    localStorage.removeItem('linndiamonds_currentUser');
    updateAuthUI();
    showNotification('Logged out successfully!', 'success');
}

// Check authentication status
function checkAuthStatus() {
    const savedUser = localStorage.getItem('linndiamonds_currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateAuthUI();
    }
}

// Update authentication UI
function updateAuthUI() {
    const authButtons = document.getElementById('authButtons');
    const userMenu = document.getElementById('userMenu');
    const walletInfo = document.getElementById('walletInfo');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const userBalance = document.getElementById('userBalance');
    
    if (currentUser) {
        authButtons.style.display = 'none';
        userMenu.style.display = 'flex';
        walletInfo.style.display = 'flex';
        usernameDisplay.textContent = currentUser.username;
        userBalance.textContent = currentUser.balance.toFixed(2);
    } else {
        authButtons.style.display = 'flex';
        userMenu.style.display = 'none';
        walletInfo.style.display = 'none';
    }
}

// Get current user
function getCurrentUser() {
    return currentUser;
}

// Show notification
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 3000);
}
