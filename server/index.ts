const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const { decode, encode } = require("base64-arraybuffer");
const cryptojs = require("crypto-js");

require("dotenv").config();

const app = express();

const faceApiKey = process.env.AZURE_FACE_API_KEY;
const faceApiEndpoint = process.env.AZURE_FACE_API_ENDPOINT;

const azureInstanceOptions = {
  baseURL: faceApiEndpoint,
  timeout: 50000,
  headers: {
    "Content-Type": "application/octet-stream",
    "Ocp-Apim-Subscription-Key": faceApiKey,
  },
};

const faceVerificationApiKey = process.env.FACE_VERIFICATION_API_KEY;
const faceVerificationApiHost = process.env.FACE_VERIFICATION_API_HOST;
const faceVerificationApiEndpoint = process.env.FACE_VERIFICATION_API_ENDPOINT;

const rapidApiInstanceOptions = {
  baseURL: faceVerificationApiEndpoint,
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "X-RapidAPI-Key": faceVerificationApiKey,
    "X-RapidAPI-Host": faceVerificationApiHost,
  },
};

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

app.post("/api/face/detect", async (req, res) => {
  try {
    const instanceOptions = { ...azureInstanceOptions };
    const instance = axios.create(instanceOptions);
    const body = req.body;

    const response = await instance.post("/detect", decode(body.image));

    res.send({
      response: "ok",
      data: response.data,
    });
  } catch (err) {
    console.log("error :c : ", err.response.data);
    res.send({ response: "not ok" });
  }
});

app.post("/api/face/compare", async (req, res) => {
  try {
    const instanceOptions = { ...rapidApiInstanceOptions };
    const instance = axios.create(instanceOptions);
    const body = req.body;

    const encodedParams = new URLSearchParams();
    encodedParams.set("image1Base64", "data:image/jpeg;base64," + body.image1);
    encodedParams.set("image2Base64", "data:image/jpeg;base64," + body.image2);

    const response = await instance.post("/faceverification", encodedParams);

    res.send(response.data);
  } catch (err) {
    console.log("error :c : ", err);
    res.send({ response: "not ok" });
  }
});

app.post("/api/encrypt", async (req, res) => {
  try {
    const body = req.body;
    const { data } = body;

    const secret = process.env.ENCRYPTION_SECRET;
    const encryptedData = cryptojs.AES.encrypt(data, secret).toString();

    res.send({
      response: "ok",
      data: encryptedData,
    });
  } catch (err) {
    console.log("error :c : ", err.response.data);
    res.send({ response: "not ok" });
  }
});

app.post("/api/decrypt", async (req, res) => {
  try {
    const body = req.body;
    const { data } = body;

    const secret = process.env.ENCRYPTION_SECRET;
    const bytes = cryptojs.AES.decrypt(data, secret);
    const originalText = bytes.toString(cryptojs.enc.Utf8);

    res.send({
      response: "ok",
      data: originalText,
    });
  } catch (err) {
    console.log("error :c : ", err.response.data);
    res.send({ response: "not ok" });
  }
});

function base64ToArrayBuffer(base64) {
  var binaryString = atob(base64);
  var bytes = new Uint8Array(binaryString.length);
  for (var i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

const PORT = 9000;
app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Running on port ${PORT}`);
  }
});
