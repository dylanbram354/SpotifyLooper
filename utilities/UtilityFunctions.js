var Buffer = require('buffer').Buffer;
import { SHA256 } from "crypto-js";

export default class Utility {
  static generateRandomString(length) {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  static base64encode(string) {
    return Buffer.from(string ?? '').toString('base64');
  }

  static generateCodeChallenge(codeVerifier){
    let hash = SHA256(codeVerifier).toString();
    return this.base64encode(hash);
  }
}