import { ComponentExample } from '../../../steps/serialization/component/examples/ComponentExample';

export type ExampleRenderer = (example: ComponentExample, container: HTMLElement) => Promise<void>;
