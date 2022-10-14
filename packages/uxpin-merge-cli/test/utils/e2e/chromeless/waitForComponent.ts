import Chromeless from 'chromeless';
import { kebabCase } from 'lodash';

const DEFAULT_TIMEOUT = 5000;

export function waitForComponent(
  chromeless: Chromeless<any>,
  componentName: string,
  timeout: number = DEFAULT_TIMEOUT
): Chromeless<any> {
  return chromeless.wait(`#header-${kebabCase(componentName)}`, timeout);
}
