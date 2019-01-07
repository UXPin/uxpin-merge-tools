import { get } from 'lodash';
import { DesignSystemSnapshot, VCSDetails } from '../DesignSystemSnapshot';

export function isSameVersion(designSystem:DesignSystemSnapshot):boolean {
  const vcsDetails:VCSDetails = designSystem.vcs;

  return get(vcsDetails, 'movedObjects.diffSourceCommitHash') === vcsDetails.commitHash;
}
