const express = require('express');
const appleSignin = require("apple-signin-auth");
const app = express();

app.get('/', (req, res) => {
  res.send('served response!');
});

// Tt1Nm2al5w1RJwjW4DOTJjQU-p-9TD_fVgPsb5FXxm8

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

app.get('/auth/apple', async (req, res) => {
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
} catch (err) {
  // Token is not verified
  console.error(err);
}})