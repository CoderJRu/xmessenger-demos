
import { isConnected } from './connectWallet.js';

const profilePopup = document.createElement('div');
profilePopup.className = 'profile-popup';
document.body.appendChild(profilePopup);

function showProfileSettings() {
  if (!isConnected) {
    alert("Please connect your wallet to view profile settings");
    return;
  }

  const userData = window.userData || { username: 'Not Set', publicKey: 'Not Connected' };
  
  profilePopup.innerHTML = `
    <div class="profile-content">
      <div class="profile-header">
        <h3>Profile Settings</h3>
        <span class="close-profile">&times;</span>
      </div>
      <div class="profile-details">
        <p><strong>Username:</strong> ${userData.username}</p>
        <p class="address"><strong>Public Address:</strong> ${userData.publicKey}</p>
      </div>
    </div>
  `;
  
  profilePopup.style.display = 'flex';
  
  const closeProfile = profilePopup.querySelector('.close-profile');
  closeProfile.addEventListener('click', () => {
    profilePopup.style.display = 'none';
  });

  // Close on outside click
  profilePopup.addEventListener('click', (event) => {
    if (event.target === profilePopup) {
      profilePopup.style.display = 'none';
    }
  });
}

// Initialize event listener
const accountDropdown = document.querySelector('.account-drop-down-window');
if (accountDropdown) {
  accountDropdown.addEventListener('click', showProfileSettings);
}

// Export for use in other modules
export { showProfileSettings };
