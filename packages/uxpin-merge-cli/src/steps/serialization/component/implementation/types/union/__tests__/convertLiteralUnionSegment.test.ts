import { PropertyType } from '../../../ComponentPropertyDefinition';
import { convertLiteralUnionSegment } from '../convertLiteralUnionSegment';

describe('convertLiteralUnionSegment', () => {
  it('should parse literals with double quotes correctly', () => {
    // having
    const value:string = '"someValue"';

    // when
    const converted:PropertyType<'literal'>|null = convertLiteralUnionSegment(value);

    // then
    expect(converted).toEqual({
      name: 'literal',
      structure: { value: 'someValue' },
    });
  });

  it('should parse literals with single quotes correctly', () => {
    // having
    const value:string = `'someValue'`;

    // when
    const converted:PropertyType<'literal'>|null = convertLiteralUnionSegment(value);

    // then
    expect(converted).toEqual({
      name: 'literal',
      structure: { value: 'someValue' },
    });
  });

  it('should return null when value can not be parsed', () => {
    // having
    const value:string = '"without closing quote';

    // when
    const converted:PropertyType<'literal'>|null = convertLiteralUnionSegment(value);

    // then
    expect(converted).toBe(null);
  });

  it('should return null when value is empty', () => {
    // having
    const value:string = '""';

    // when
    const converted:PropertyType<'literal'>|null = convertLiteralUnionSegment(value);

    // then
    expect(converted).toBe(null);
  });

  describe('numbers', () => {
    it('should parse numbers correctly', () => {
      // having
      const value:string = '123';

      // when
      const converted:PropertyType<'literal'> | null = convertLiteralUnionSegment(value);

      // then
      expect(converted).toEqual({
        name: 'literal',
        structure: { value: 123 },
      });
    });

    it('should parse negative numbers correctly', () => {
      // having
      const value:string = '-123';

      // when
      const converted:PropertyType<'literal'> | null = convertLiteralUnionSegment(value);

      // then
      expect(converted).toEqual({
        name: 'literal',
        structure: { value: -123 },
      });
    });

    it('should parse float numbers correctly', () => {
      // having
      const value:string = '-123.4205403';

      // when
      const converted:PropertyType<'literal'> | null = convertLiteralUnionSegment(value);

      // then
      expect(converted).toEqual({
        name: 'literal',
        structure: { value: -123.4205403 },
      });
    });

    it('should parse zero correctly', () => {
      // having
      const value:string = '0';

      // when
      const converted:PropertyType<'literal'> | null = convertLiteralUnionSegment(value);

      // then
      expect(converted).toEqual({
        name: 'literal',
        structure: { value: 0 },
      });
    });
  });
});
