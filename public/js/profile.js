
import { isConnected } from './connectWallet.js';

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
  
  profilePopup.style.display = 'block';
  
  const closeButton = profilePopup.querySelector('.close-profile');
  closeButton.onclick = () => {
    profilePopup.style.display = 'none';
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const accountDropdown = document.querySelector('.account-drop-down-window');
  if (accountDropdown) {
    accountDropdown.addEventListener('click', showProfileSettings);
  }
});
