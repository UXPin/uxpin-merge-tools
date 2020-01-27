import { ComponentImplementationInfo, ComponentInfo, ComponentPresetInfo } from './ComponentInfo';
import { getDocumentationInfo } from './documentation/getDocumentationInfo';
import { getImplementationInfo } from './implementation/getImplementationInfo';
import { ComponentPaths } from './paths/ComponentPaths';
import { getComponentPaths } from './paths/getComponentPaths';
import { getPresetInfos } from './presets/getPresetInfos';
import { getStoryInfos } from './stories/getStoryInfos';

export async function getComponentInfo(projectRoot:string, implementationPath:string):Promise<ComponentInfo | null> {
  const implementation:ComponentImplementationInfo | null = getImplementationInfo(implementationPath);
  if (!implementation) {
    return null;
  }
  const paths:ComponentPaths = getComponentPaths(projectRoot, implementationPath);
  return {
    dirPath: paths.componentDirPath,
    implementation,
    ...await getDocumentation(paths),
    ...await getPresets(paths),
    ...await getStories(paths),
  };
}

async function getDocumentation(paths:ComponentPaths):Promise<Pick<ComponentInfo, 'documentation'>> {
  try {
    return { documentation: await getDocumentationInfo(paths) };
  } catch {
    return {};
  }
}

async function getPresets(paths:ComponentPaths):Promise<Pick<ComponentInfo, 'presets'>> {
  try {
    return { presets: await getPresetInfos(paths) };
  } catch {
    return {};
  }
}

async function getStories(paths:ComponentPaths):Promise<Pick<ComponentInfo, 'stories'>> {
  try {
    const stories:ComponentPresetInfo[] = await getStoryInfos(paths);
    return { stories };
  } catch {
    return {};
  }
}
