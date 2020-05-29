import { using } from '../../../../../../test/utils/using';
import { decodeBranchName } from '../decodeBranchName';

describe('decodeBranchName', () => {

  interface Case {
    expectedBranchName:string;
    encodedBranchName:string;
    caseName:string;
  }

  const cases:Case[] = [
    {
      caseName: 'regular branch name is not affected',
      encodedBranchName: '1234-my-regular-branch-name',
      expectedBranchName: '1234-my-regular-branch-name',
    },
    {
      caseName: 'encoded branch name with special characters is decoded like URI component but with : instead of %',
      encodedBranchName: '4eqer2:25:24:23:40:3B:2C:2Csdaf',
      expectedBranchName: '4eqer2%$#@;,,sdaf',
    },
    {
      caseName: 'encoded branch name with % character',
      encodedBranchName: 'branch:252Far',
      expectedBranchName: 'branch%2Far',
    },
    {
      caseName: 'not encoded branch name with % character is not affected',
      encodedBranchName: 'branch%2Far',
      expectedBranchName: 'branch%2Far',
    },
    {
      caseName: 'not encoded branch name with special characters is not affected',
      encodedBranchName: '4eqer2%$#@;,,sdaf',
      expectedBranchName: '4eqer2%$#@;,,sdaf',
    },
  ];

  using(cases).describe('Correctly encodes ', ({ expectedBranchName, caseName, encodedBranchName }) => {
    it(caseName, () => {
      expect(decodeBranchName(encodedBranchName)).toEqual(expectedBranchName);
    });
  });
});
