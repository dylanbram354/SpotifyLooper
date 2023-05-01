var Buffer = require('buffer').Buffer;

export default class UtilityFunctions {
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
}