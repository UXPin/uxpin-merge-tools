import { getToolVersion } from '../../../program/utils/version/getToolVersion';

interface UXPinUserAgentHeaders {
  'User-Agent':string;
}

export async function getUserAgentHeaders():Promise<UXPinUserAgentHeaders> {
  const toolVersion:string = await getToolVersion();

  return {
    'User-Agent': `uxpin-merge-cli-${toolVersion}`,
  };
}
