//npm install rijndael-js
import Rijndael from "rijndael-js";

//npm install buffer

import { Buffer } from "buffer/"; //Notice forward "/"

/*
Add to index.html inside <head>:
<script>
  //Create global reference to window
  window.global = window;
</script>
<script type="module">
  //Create global reference to Buffer
  import { Buffer } from "buffer/"; //Notice forward "/"
  window.Buffer = Buffer;
</script>
*/

//npm install randombytes
import randomBytes from "randombytes";

/**
 * Encrypt data using Rindjael AES
 * @param {*} key Key (exactly 32 bytes or it will be zero-padded)
 * @param {*} payload
 */
const encrypt = (key, payload) => {
  // IV is necessary for CBC mode
  // IV should have same length with the block size (16 bytes)
  const iv = randomBytes(16);

  //Convert IV to string (32 bytes)
  const ivString = iv.toString("hex");

  //console.log(`key: ${key} IV: ${iv}`);

  const data = payload;

  // Create Rijndael instance
  // `new Rijndael(key, mode)`
  const cipher = new Rijndael(key, "cbc");

  // `Rijndael.encrypt(plaintext, blockSize[, iv]) -> <Array>`
  // Output will always be <Array> where every element is an integer <Number>
  const cipherBuffer = Buffer.from(cipher.encrypt(data, 128, iv));

  //Encode cipher buffer to base 64
  const base64Payload = cipherBuffer.toString("base64");

  //Prepend IV and encode again to base64
  return `${ivString}${base64Payload}`;
};

/**
 * Create API Token with timeout
 * @param {*} apiKey
 * @param {*} userKey
 * @returns
 */
export const createToken = (apiKey, userKey) =>
  encrypt(apiKey, `${userKey}#${new Date().toISOString()}`);

/**
 * Decrypt an base64 payload generated with encrypt
 * @param {*} key
 * @param {*} base64Payload
 * @returns
 */
const decrypt = (key, base64Payload) => {
  // `Rijndael.decrypt(ciphertext, blockSize[, iv]) -> <Array>`

  //console.log('base64 payload: ', base64Payload);

  //Get IV and base64 encoded cipher text
  //For IV, take the first 32 bytes (IV hex string)
  const iv = Buffer.from(base64Payload.substring(0, 32), "hex");

  //console.log('IV length: ', iv.length);

  //console.log(`IV: ${iv} Payload: ${base64Payload.substring(32)}`);

  const cipherBuffer = Buffer.from(base64Payload.substring(32), "base64");

  //console.log('Cipher buffer: ', cipherBuffer.toString('hex'));

  // Create Rijndael instance
  // `new Rijndael(key, mode)`
  const cipher = new Rijndael(key, "cbc");

  const decrypted = cipher.decrypt(cipherBuffer, 128, iv);

  //console.log('decrypted:', decrypted);

  const decoded = Buffer.from(decrypted).toString();

  //Replace non-printable ASCII
  const plainText = decoded.replace(/[^ -~]+/g, "");

  return plainText;
};

// const generateToken = () =>
//   createToken(import.meta.env.VITE_API_SIGN_KEY, import.meta.env.VITE_USER_KEY);

export default {
  // generateToken,
  createToken,
  encrypt,
  decrypt,
};
