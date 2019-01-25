import { Environment } from './Environment';

export function isTestEnv():boolean {
  return process.env.NODE_ENV === Environment.TEST;
}
