import { Environment } from '../Environment';
import { setNodeEnv } from '../setNodeEnv';

describe('setNodeEnv', () => {
  let initialEnv:any;

  beforeEach(() => {
    initialEnv = process.env.NODE_ENV;
  });

  afterEach(() => {
    process.env.NODE_ENV = initialEnv;
  });

  it('should set correct environment', () => {
    // when
    setNodeEnv(Environment.TEST);

    // then
    expect(process.env.NODE_ENV).toEqual(Environment.TEST);
  });
});
