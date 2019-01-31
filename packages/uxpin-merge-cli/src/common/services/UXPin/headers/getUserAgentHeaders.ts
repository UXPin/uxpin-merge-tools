import { getToolVersion } from '../../../../program/utils/version/getToolVersion';

interface UXPinUserAgentHeaders {
  'User-Agent':string;
}

export function getUserAgentHeaders():UXPinUserAgentHeaders {
  const toolVersion:string = getToolVersion();

  return {
    'User-Agent': `uxpin-merge-cli-${toolVersion}`,
  };
}
