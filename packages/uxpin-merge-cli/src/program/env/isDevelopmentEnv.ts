import { Environment } from './Environment';

export function isDevelopmentEnv(): boolean {
  return process.env.UXPIN_ENV === Environment.DEVELOPMENT;
}
