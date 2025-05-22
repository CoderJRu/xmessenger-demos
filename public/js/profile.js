
import { isConnected, data } from './connectWallet.js';

const profilePopup = document.createElement('div');
profilePopup.className = 'profile-popup';
document.body.appendChild(profilePopup);

export function showProfileSettings() {
  if (!isConnected) {
    alert("Please connect your wallet to view profile settings");
    return;
  }

  const profileData = {
    username: data.username || 'Not Set',
    publicKey: data.publicKey || 'Not Connected',
    profileImage: 'img/person-img.png'
  };
  console.log("i got ere");
  profilePopup.innerHTML = `
    <div class="profile-content">
      <div class="profile-header">
        <h3>Profile Settings</h3>
        <span class="close-profile">&times;</span>
      </div>
      <div class="profile-details">
        <div class="profile-image-container">
          <img src="${profileData.profileImage}" alt="Profile" class="profile-image">
        </div>
        <div class="profile-info">
          <p><strong>Username:</strong> ${profileData.username}</p>
          <p class="address"><strong>Public Key:</strong> ${profileData.publicKey}</p>
        </div>
      </div>
    </div>
  `;
  
  profilePopup.style.display = 'flex';
  
  const closeButton = profilePopup.querySelector('.close-profile');
  closeButton.addEventListener('click', () => {
    profilePopup.style.display = 'none';
  });

  // Close on outside click
  profilePopup.addEventListener('click', (event) => {
    if (event.target === profilePopup) {
      profilePopup.style.display = 'none';
    }
  });
}

// Initialize profile dropdown click handler
const accountDropdown = document.querySelector('.account-drop-down-window');
if (accountDropdown) {
  console.log("i was clicked")
  accountDropdown.addEventListener('click', showProfileSettings);
}
