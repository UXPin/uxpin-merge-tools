import { isDevelopmentEnv } from '../../../../src/program/env/isDevelopmentEnv';
import { isTestEnv } from '../../../../src/program/env/isTestEnv';

const TEST_UXPIN_API_DOMAIN = '0.0.0.0';

export function getDefaultApiDomain(domain: string): string {
  return isTestEnv() || isDevelopmentEnv() ? process.env.UXPIN_API_DOMAIN || TEST_UXPIN_API_DOMAIN : `api.${domain}`;
}
