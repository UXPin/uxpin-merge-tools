import { Environment } from '../Environment';
import { setNodeEnv } from '../setNodeEnv';

describe('setNodeEnv', () => {
  let initialEnv:any;

  beforeEach(() => {
    initialEnv = process.env.UXPIN_ENV;
  });

  afterEach(() => {
    process.env.UXPIN_ENV = initialEnv;
  });

  it('should set correct environment', () => {
    // when
    setNodeEnv(Environment.TEST);

    // then
    expect(process.env.UXPIN_ENV).toEqual(Environment.TEST);
  });
});
