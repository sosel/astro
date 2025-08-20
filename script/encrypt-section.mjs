// 用法：node script/encrypt-section.mjs <输入html> <输出json> "<密码>"
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const [,, inFile, outFile, pwdArg] = process.argv;
const password = process.env.SECTION_PASSWORD || pwdArg;
if (!inFile || !outFile || !password) {
  console.error('用法: node script/encrypt-section.mjs <输入html> <输出json> "<密码>"');
  process.exit(1);
}
const plaintext = fs.readFileSync(inFile);

const salt = crypto.randomBytes(16);
const iv = crypto.randomBytes(12);
const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const tag = cipher.getAuthTag();

const payload = {
  kdf: 'PBKDF2-SHA256',
  iter: 100000,
  salt: salt.toString('base64'),
  iv: iv.toString('base64'),
  alg: 'AES-256-GCM',
  ct: ciphertext.toString('base64'),
  tag: tag.toString('base64'),
};
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(payload));
console.log('Wrote', outFile);
