export var isConnected = false;
export var data = {
  username: '',
  publicKey: ''
};

export function updateUserData(username, publicKey) {
  data.username = username;
  data.publicKey = publicKey;
}
var phraseList = [];
var publicKey = "";
var privateKey = "";
import { showLoading, hideLoading } from "./loading.js";
showLoading();
document
  .getElementById("connect-button-id")
  .addEventListener("click", async () => {
    const overlay = document.getElementById('connect-wallet-overlay');
    overlay.style.display = 'flex';
  });

document
  .getElementById("close-wallet-btn")
  .addEventListener("click", () => {
    const overlay = document.getElementById('connect-wallet-overlay');
    overlay.style.display = 'none';
  });

document
  .getElementById("proceed-wallet-btn")
  .addEventListener("click", async () => {
    showLoading();
    try {
      const inputs = document.querySelectorAll('.phrase-input');
      const phrases = Array.from(inputs).map(input => input.value).join(' ');
      // Your connection logic here using the phrases
      const overlay = document.getElementById('connect-wallet-overlay');
      overlay.style.display = 'none';
    } finally {
      hideLoading();
    }
  });

document
  .getElementById("create-button-id")
  .addEventListener("click", async () => {
    document.getElementById("grey-background-id").removeAttribute("hidden");
    //
    showLoading();
    var bodyJson = {
      pass: "00000",
    };
    const response = await fetch("/generatePhrases", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyJson),
    });
    var results = await response.json();

    if (results._res == "error") {
      hideLoading();
      return;
    } else {
      var yourMnemonics = results._res._mnemonics;
      var phrases = yourMnemonics.split(" ");
      phraseList = phrases;
      privateKey = results._res.privateKey;
      publicKey = results._res.publicKey;
      var gridItems = document.querySelectorAll(".phrase-para");
      // console.log(gridItems);
      if (gridItems.length > 0) {
        gridItems.forEach((items, index) => {
          items.innerHTML = phrases[index];
        });
      }
    }
    hideLoading();
  });

document
  .getElementById("cancel-wallet-button-id")
  .addEventListener("click", () => {
    document.getElementById("grey-background-id").setAttribute("hidden", true);
  });

document
  .getElementById("create-wallet-button-id")
  .addEventListener("click", async () => {
    var bodyJson = {
      Keypair: {
        publicKey: publicKey,
        privateKey: privateKey,
      },
    };
    showLoading();
    const response = await fetch("/ceaateAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyJson),
    });
    var results = await response.json();
    document.getElementById("grey-background-id").setAttribute("hidden", true);
    var gridItems = document.querySelectorAll(".phrase-para");
    // console.log(gridItems);
    if (gridItems.length > 0) {
      gridItems.forEach((items, index) => {
        items.innerHTML = "NULL";
      });
    }
    isConnected = true;
    if (results._res == "success") {
      data = results.data;
      console.log(data);
    }
    hideLoading();
  });
hideLoading();
