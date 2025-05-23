import express from "express";
import { connectSdk, loggingMnemonics } from "./demosInstance.js";
const app = express();
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import { generateKeypair } from "./demosInstance.js";
import { generateID, generateFloatID, delay, abbrNum } from "./matheFunc.js";
import { lastNames, firstNames } from "./names.js";
import { constrainedMemory } from "process";
const supaKey = process.env["SUPABASE_KEY"];
const supaUrl = process.env["SUPABASE_URL"];
const supabase = createClient(supaUrl, supaKey);

const InsertDb = async (newData, pubKey) => {
  try {
    const { data, error } = await supabase.from("user").insert({
      api: pubKey,
      data: newData,
    });
  } catch (err) {}
};

const UpdateDb = async (table, data, target, targetValue) => {
  const { error } = await supabase
    .from(table)
    .update({
      data: data,
    })
    .eq(target, targetValue);
};

const FetchDb = async (table, target, targetValue) => {
  const { data: _data } = await supabase
    .from(table)
    .select()
    .eq(target, targetValue);
};

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

app.post("/generatePhrases", async (req, res) => {
  try {
    const { _mnemonics, _status, _kepair, _publicKey, _privateKey } =
      await generateKeypair();
    var resultsjson = { _mnemonics, _status, _kepair, _publicKey, _privateKey };
    console.log(resultsjson);
    res.status(200).json({ _res: resultsjson });
  } catch (err) {
    console.log(err);
    res.status(200).json({ _res: "error" });
  }
});

app.post("/ceaateAccount", async (req, res) => {
  try {
    let bodyJson = req.body;
    var _keyPair = bodyJson.Keypair;
    var publicKey = _keyPair.publicKey;
    var selectedFirstName = firstNames[generateID(0, firstNames.length - 1)];
    var selectedLastName = lastNames[generateID(0, lastNames.length - 1)];
    var _username =
      selectedFirstName + " " + selectedLastName + "_" + generateID(1000, 9999);
    var _newData = {
      id: generateID(1010101010101, 1781109012010999),
      username: _username,
      publicKey: publicKey,
    };
    await InsertDb(_newData, publicKey);
    res.status(200).json({ _res: "success", data: _newData });
    //await InsertDbb()
    //insert acc to db
  } catch (err) {
    console.log(err);
  }
});

app.post("/loginPhrase", async (req, res) => {
  try {
    let bodyJson = req.body;
    var _phraseList = bodyJson.PhraseList;
    var status = await loggingMnemonics(_phraseList);
    console.log("public is ", status.publicKey);
    var myData = await FetchDb("user", "api", status.publicKey);
    if(myData.length > 0){
      var fetchedData = myData[0].data;
       res.status(200).json({ _res: "success", data: fetchedData });
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(8080, () => {
  console.log("server is running dick! at port 8080");
});
