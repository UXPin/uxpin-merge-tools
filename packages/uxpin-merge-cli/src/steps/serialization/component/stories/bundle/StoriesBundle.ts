import { ComponentPlaceholder } from '../../presets/jsx/compile/generateVirtualModules';
import { JSXSerializedElement } from '../../presets/jsx/JSXSerializationResult';

export interface StoriesBundle {
  [importName:string]:ComponentStorySet;
}

export interface ComponentStorySet extends ComponentStories {
  default:ComponentStorySetMetadata | any;
}

export interface ComponentStories {
  [exportName:string]:ComponentStory;
}

export interface ComponentStorySetMetadata {
  title?:string;
  component?:ComponentPlaceholder;
  decorators?:any[];
  parameters?:any[];
}

export interface ComponentStory {
  ():JSXSerializedElement;
  story?:ComponentStoryMetadata;
}

export interface ComponentStoryMetadata {
  name?:string;
  decorators?:any[];
  parameters?:any[];
}
