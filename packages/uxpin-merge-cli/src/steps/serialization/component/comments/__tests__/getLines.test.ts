import { getLines } from '../getLines';

describe('getLines', () => {
  describe('when string is given', () => {
    it('should return trimmed lines array', () => {
      // having
      // tslint:disable:no-trailing-whitespace
      const value:string = `

multiline
text with      
    whitespaces and
    stuff
    
    
    
    `;
      // tslint:enable:no-trailing-whitespace

      // when
      const lines:string[] = getLines(value);

      // then
      expect(lines).toEqual([
        'multiline',
        'text with',
        'whitespaces and',
        'stuff',
      ]);
    });
  });
});
