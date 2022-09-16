import { Environment } from '../Environment';
import { isTestEnv } from '../isTestEnv';

describe('isTestEnv', () => {
  describe('test env', () => {
    let initialEnv: any;

    beforeEach(() => {
      initialEnv = process.env.UXPIN_ENV;

      // when
      process.env.UXPIN_ENV = Environment.TEST;
    });

    afterEach(() => {
      process.env.UXPIN_ENV = initialEnv;
    });

    it('should return true for test environment', () => {
      // then
      expect(isTestEnv()).toBe(true);
    });
  });

  describe('different env', () => {
    let initialEnv: any;

    beforeEach(() => {
      initialEnv = process.env.UXPIN_ENV;

      // when
      process.env.UXPIN_ENV = Environment.PRODUCTION;
    });

    afterEach(() => {
      process.env.UXPIN_ENV = initialEnv;
    });

    it('should return false for different environment', () => {
      // then
      expect(isTestEnv()).toBe(false);
    });
  });
});
