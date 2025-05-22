
import { isConnected, data } from './connectWallet.js';

const profilePopup = document.createElement('div');
profilePopup.className = 'profile-popup';
document.body.appendChild(profilePopup);
const profileData = {
  username: data.username,
  publicKey: data.publicKey,
  profileImage: 'img/person-img.png'
};

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

function showProfileSettings() {
  console.log("Showing profile settings, connected:", isConnected);
  if (!isConnected) {
    alert("Please connect your wallet to view profile settings");
    return;
  }

  const profileData = {
    username: data.username,
    publicKey: data.publicKey,
    profileImage: 'img/person-img.png'
  };

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
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      profilePopup.style.display = 'none';
    });
  }

  profilePopup.addEventListener('click', (event) => {
    if (event.target === profilePopup) {
      profilePopup.style.display = 'none';
    }
  });
}

// Initialize profile dropdown click handler
document.addEventListener('DOMContentLoaded', () => {
  const accountDropdown = document.querySelector('.account-drop-down-window');
  if (accountDropdown) {
    accountDropdown.addEventListener('click', showProfileSettings);
  }
});
