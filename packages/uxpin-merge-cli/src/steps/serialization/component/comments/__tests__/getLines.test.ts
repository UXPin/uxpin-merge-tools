import { getLines } from "../getLines";

describe('getLines', () => {
  describe('when string is given', () => {
    it('should return trimmed lines array', () => {
      // having
      const value:string = `

multiline
text with      
    whitespaces and
    stuff
    
    
    
    `;

      // when
      const lines:string[] = getLines(value);

      // then
      expect(lines).toEqual([
        'multiline',
        'text with',
        'whitespaces and',
        'stuff',
      ])
    });
  })
});
