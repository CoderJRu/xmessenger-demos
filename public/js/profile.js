
import { isConnected } from './connectWallet.js';

// Create profile popup element
const profilePopup = document.createElement('div');
profilePopup.className = 'profile-popup';
profilePopup.style.display = 'none';
document.body.appendChild(profilePopup);

export function showProfileSettings() {
  if (!isConnected) {
    alert("Please connect your wallet to view profile settings");
    return;
  }

  const userData = window.userData || { username: 'Not Set', publicKey: 'Not Connected' };
  
  profilePopup.innerHTML = `
    <div class="profile-content">
      <div class="profile-header">
        <h3>Profile Settings</h3>
        <button class="close-profile">&times;</button>
      </div>
      <div class="profile-details">
        <p><strong>Username:</strong> ${userData.username}</p>
        <p class="address"><strong>Public Address:</strong> ${userData.publicKey}</p>
      </div>
    </div>
  `;
  
  profilePopup.style.display = 'flex';
  
  const closeButton = profilePopup.querySelector('.close-profile');
  closeButton.onclick = () => {
    profilePopup.style.display = 'none';
  };

  // Close on click outside
  profilePopup.addEventListener('click', (e) => {
    if (e.target === profilePopup) {
      profilePopup.style.display = 'none';
    }
  });
}

// Initialize after DOM loads
window.addEventListener('DOMContentLoaded', () => {
  const accountDropdown = document.querySelector('.account-drop-down-window');
  if (accountDropdown) {
    accountDropdown.addEventListener('click', showProfileSettings);
  }
});
