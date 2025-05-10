import { DemosWebAuth } from "@kynesyslabs/demosdk/websdk";
import { demos } from "@kynesyslabs/demosdk/websdk";
import bip39 from "bip39";

export async function connectSdk() {
  var result = await demos.connect("https://demosnode.discus.sh");
  console.log(result);
}

//me();

const identity = DemosWebAuth.getInstance();

export const generateKeypair = async () => {
  const mnemonics = bip39.generateMnemonic();
  console.log("mememonics ", mnemonics);
  const optional_seed = await bip39.mnemonicToSeed(mnemonics);
  const [status, keypair] = await identity.create(optional_seed);
  const priavteKey = keypair.privateKey;
  const publicKey = keypair.publicKey;
  //console.log("privateKey is ", priavteKey);
  //console.log("mnemonices is ", mnemonics);
  //console.log("publicKey is ", publicKey);
  await loggingMnemonics(mnemonics);
  
  // console.log("keypairs is ", keypair);
  // console.log("status is ", status);

  return {
    _mnemonics: mnemonics,
    _status: status,
    _keypair: keypair,
  };
};

generateKeypair();

export const loggingMnemonics = async (mnemonics) => {
  const seed = bip39.mnemonicToSeedSync(mnemonics);
  const keypair = DemosWebAuth.keyPairFromMnemonic(seed);
  const [status, message] = await identity.login(keypair.privateKey);
  const msg = "Hello World!"
  const [_status, signature] = await identity.sign(msg);
  console.log("signature is ", signature);
  await identity.logout()
};


export const loggingPrivateKey = async (privateKey) => {
  const [status, message] = await identity.login(privateKey)
}