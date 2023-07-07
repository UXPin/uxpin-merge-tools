import { parseAsCondition } from '../parseUsePortal';

describe('Parse string and check valid condition (to be used in a function run against props)', () => {
  it('Should accept a basic condition', () => {
    expect(parseAsCondition(`props.mode === "modal"`)).toBe(true);
  });
  it('Should accept a more complex condition', () => {
    expect(parseAsCondition(`props.isValid && props.mode === "modal"`)).toBe(true);
  });
  it('Should accept a ternary', () => {
    expect(parseAsCondition(`props.mode === "modal" ? true : false`)).toBe(true);
  });
  it('Should accept a boolean', () => {
    expect(parseAsCondition(`true`)).toBe(true);
  });

  it('Should reject a function', () => {
    expect(parseAsCondition(`function() {}`)).toBe(false);
  });
  it(`Should reject random content`, () => {
    expect(parseAsCondition(`not a condition`)).toBe(false);
  });
});
