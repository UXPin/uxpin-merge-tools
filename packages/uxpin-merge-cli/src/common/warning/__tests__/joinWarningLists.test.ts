import { joinWarningLists } from '../joinWarningLists';
import { WarningDetails } from '../WarningDetails';

describe('joinWarningLists', () => {
  describe('joining list of lists of warnings into a flat list', () => {
    it('returns flat array with of warning object supplied with source path', () => {
      const suppliedPath:string = '/Users/user/Projects/design-system/components/Button';
      const firstError:Error = new Error();
      const firstWarning:WarningDetails = {
        message: 'first message',
        originalError: firstError,
        sourcePath: 'other/source/Path',
      };
      const secondError:Error = new Error('some message');
      const secondWaning:WarningDetails = {
        message: 'second message',
        originalError: secondError,
      };
      const thirdError:Error = new Error('some other message');
      const thirdWarning:WarningDetails = {
        message: 'third message',
        originalError: thirdError,
      };

      const warningLists:WarningDetails[][] = [[firstWarning], [secondWaning, thirdWarning]];
      const expectedWarningList:WarningDetails[] = [
        {
          message: 'first message',
          originalError: firstError,
          sourcePath: 'other/source/Path',
        },
        {
          message: 'second message',
          originalError: secondError,
          sourcePath: suppliedPath,
        },
        {
          message: 'third message',
          originalError: thirdError,
          sourcePath: suppliedPath,
        },
      ];

      // when
      const result:WarningDetails[] = joinWarningLists(warningLists, suppliedPath);

      // then
      expect(result).toEqual(expectedWarningList);
      const [firstResult, secondResult, thirdResult] = result;
      expect(firstResult).not.toBe(firstWarning);
      expect(secondResult).not.toBe(secondWaning);
      expect(thirdResult).not.toBe(thirdError);
    });
  });
});
