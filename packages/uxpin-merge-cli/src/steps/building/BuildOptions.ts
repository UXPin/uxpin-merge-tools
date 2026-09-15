import { Command } from '../../program/command/Command';
import { ProvidedRevision } from '../serialization/vcs/repositories/provided/ProvidedRepositoryAdapter';

export interface BuildOptions {
  command: Command;
  branch?: string;
  /** Set when the revision does not come from a version control system. */
  revision?: ProvidedRevision;
  development?: boolean;
  force?: boolean;
  pageHeadTags?: string[];
  projectRoot: string;
  tag?: string;
  token?: string;
  uxpinDirPath: string;
  uxpinApiDomain?: string;
  uxpinDomain?: string;
  webpackConfigPath?: string;
  wrapperPath?: string;
}
