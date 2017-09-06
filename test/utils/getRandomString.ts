import { randomBytes } from 'crypto';

export function getRandomString(lenght:number = 8):string {
  const lettersPerByte:number = 2;
  return randomBytes(lenght / lettersPerByte).toString('hex');
}
