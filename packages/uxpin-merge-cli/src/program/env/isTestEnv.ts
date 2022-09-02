import { Environment } from './Environment';

export function isTestEnv(): boolean {
  return process.env.UXPIN_ENV === Environment.TEST;
}
