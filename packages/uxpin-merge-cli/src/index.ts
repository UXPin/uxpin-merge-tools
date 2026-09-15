import 'source-map-support/register';
export { runProgram } from './program/runProgram';
export { Command } from './program/command/Command';
export { getToolVersion } from './program/utils/version/getToolVersion';
export { dumpDesignSystem } from './api/dumpDesignSystem';
export { DumpDesignSystemOptions, VirtualFile } from './api/dumpDesignSystem';
export { ProvidedRevision } from './steps/serialization/vcs/repositories/provided/ProvidedRepositoryAdapter';
export { DesignSystemSnapshot } from './steps/serialization/DesignSystemSnapshot';
