import { DesignSystemSnapshot, VCSDetails } from '../DesignSystemSnapshot';

export function isSameVersion(designSystem: DesignSystemSnapshot): boolean {
  const vcsDetails: VCSDetails = designSystem.vcs;

  return !!vcsDetails.movedObjects && vcsDetails.movedObjects.diffSourceCommitHash === vcsDetails.commitHash;
}
