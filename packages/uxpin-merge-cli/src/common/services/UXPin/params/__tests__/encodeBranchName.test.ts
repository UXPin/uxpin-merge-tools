import { using } from '../../../../../../test/utils/using';
import { encodeBranchName } from '../encodeBranchName';

describe('encodeBranchName', () => {

  interface Case {
    branchName:string;
    expectedEncoded:string;
    caseName:string;
  }

  const cases:Case[] = [
    {
      branchName: '1234-my-regular-branch-name',
      caseName: 'regular branch name is not affected',
      expectedEncoded: '1234-my-regular-branch-name',
    },
    {
      branchName: '4eqer2%$#@;,,sdaf',
      caseName: 'branch name with special characters is encoded like URI component but with : instead of %',
      expectedEncoded: '4eqer2:25:24:23:40:3B:2C:2Csdaf',
    },
    {
      branchName: 'branch%2Far',
      caseName: 'branch name with % character',
      expectedEncoded: 'branch:252Far',
    },
  ];

  using(cases).describe('Correctly encodes ', ({ branchName, caseName, expectedEncoded }) => {
    it(caseName, () => {
      expect(encodeBranchName(branchName)).toEqual(expectedEncoded);
    });
  });
});
