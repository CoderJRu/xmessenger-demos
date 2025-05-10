var provider = null;
var signer = null;
export var isConnected = false;

const EtherConnect = async () => {
  provider = new ethers.providers.Web3Provider(window.ethereum);

  const accounts = await provider.send("eth_requestAccounts", []);
  console.log(accounts);

  isConnected = true;
  signer = provider.getSigner();
};

document
  .getElementById("connect-button-id")
  .addEventListener("click", async () => {
    await EtherConnect();
  });
