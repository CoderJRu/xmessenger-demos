import express from "express";
import { connectSdk } from "./demosInstance.js";
const app = express();
import cors from "cors";

const corsOption = {
  origin: [
    "https://38091a36-f5e0-4f69-abf4-8e2354cc1aee-00-1mt2da426qtul.riker.replit.dev:3001/",
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
    "https://xbundle-dapp.replit.app",
    "https://xbundle.cloud",
  ],
  optionSucessStatus: 200,
};

app.use(express.static("public"), cors(corsOption), express.json());

connectSdk();
//"https://demosnode.discus.sh"

app.listen(8080, () => {
  console.log("server is running dick! at port 8080");
});
