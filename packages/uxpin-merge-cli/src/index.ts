import 'source-map-support/register';

export { runProgram } from './program/runProgram';
export { Command } from './program/command/Command';
export { getToolVersion } from './program/utils/version/getToolVersion';

export { ComponentImplementationInfo } from './steps/discovery/component/ComponentInfo';
export { ImplSerializationResult } from './steps/serialization/component/implementation/ImplSerializationResult';
export { serializeJSComponent } from './steps/serialization/component/implementation/javascript/serializeJSComponent';
export { serializeTSComponent } from './steps/serialization/component/implementation/typescript/serializeTSComponent';
export { DesignSystemSnapshot } from './steps/serialization/DesignSystemSnapshot';
