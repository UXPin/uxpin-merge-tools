import { ComponentInfo } from '../../discovery/component/ComponentInfo';
import { ComponentExample } from './examples/ComponentExample';
import { ComponentPropertyDefinition } from './implementation/ComponentPropertyDefinition';
import { ComponentPreset } from './presets/ComponentPreset';
import { ComponentWrapper } from './wrappers/ComponentWrapper';

export interface ComponentMetadata {
  componentDocUrl?: string;
  defaultExported: boolean;
  description?: string;
  name: string;
  namespace?: ComponentNamespace;
  properties: ComponentPropertyDefinition[];
  usePortal?: boolean | string;
  wrappers?: ComponentWrapper[];
}

export interface ComponentDefinition extends ComponentMetadata {
  // @todo: documentation should in form of Markdown converted to draft.js format
  documentation: { examples: ComponentExample[] };
  info: ComponentInfo;
  presets: ComponentPreset[];
}

export interface ComponentNamespace {
  importSlug: string;
  name: string;
}
