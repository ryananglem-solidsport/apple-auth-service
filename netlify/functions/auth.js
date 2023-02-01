const express = require('express');
const appleSignin = require("apple-signin-auth");
const app = express();
/*
exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" }),
  };
};
*/

exports.handler = async (req, res) => {
  const { authorization, user } = req.body;
  

try {
  const { sub: userAppleId } = await appleSignin.verifyIdToken(
    authorization.id_token, // We need to pass the token that we wish to decode.
    {
      // ---------------------------------------
      // from the frontend:
      //
      // clientId: 'com.solidsport.staging',
      // team_id: '9XF6RT59W9',
      // key_id: '63RT2FN7T6',
      // scope: 'name email',
      // ---------------------------------------
      audience: "com.solidsport.staging", // client id - The same one we used on the frontend, this is the secret key used for encoding and decoding the token.
      nonce: 'nonce' // nonce - The same one we used on the frontend - OPTIONAL
    }
  );
  return { statusCode: 200}
} catch (err) {
  // Token is not verified
  console.error(err);
  return { statusCode: 401}
}}