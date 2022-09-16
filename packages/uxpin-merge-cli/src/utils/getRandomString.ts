import { randomBytes } from 'crypto';

export function getRandomString(lenght = 8): string {
  const lettersPerByte = 2;
  return randomBytes(lenght / lettersPerByte).toString('hex');
}
