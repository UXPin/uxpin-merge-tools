import { ensureIsValidCondition } from '../parseUsePortal';

describe('Parse string and check valid condition (to be used in a function run against props)', () => {
  it('Should accept a basic condition', () => {
    expect(ensureIsValidCondition(`props.mode === "modal"`)).toBe(true);
  });
  it('Should accept a more complex condition', () => {
    expect(ensureIsValidCondition(`props.isValid && props.mode === "modal"`)).toBe(true);
  });
  it('Should accept a ternary', () => {
    expect(ensureIsValidCondition(`props.mode === "modal" ? true : false`)).toBe(true);
  });
  it('Should accept a boolean', () => {
    expect(ensureIsValidCondition(`true`)).toBe(true);
  });

  it('Should reject an alert()', () => {
    expect(ensureIsValidCondition(`alert(1) && props.mode === "modal"`)).toBe(false);
  });
  it('Should reject expression with multiple body', () => {
    expect(ensureIsValidCondition(`props.mode === "modal" false`)).toBe(false);
  });
  it('Should reject multiple statements', () => {
    expect(ensureIsValidCondition(`props.isValid && props.mode === "modal"; alert(1)`)).toBe(false);
  });
  it('Should reject a function', () => {
    expect(ensureIsValidCondition(`function() {}`)).toBe(false);
  });
  it(`Should reject random content`, () => {
    expect(ensureIsValidCondition(`not a condition`)).toBe(false);
  });
});
