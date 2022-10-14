import { Store } from '../Store';

interface SimpleState {
  foo: boolean;
  bar: string;
}

describe('Store', () => {
  let store: Store<SimpleState>;

  beforeEach(() => {
    // having
    store = new Store({
      bar: 'test',
      foo: true,
    });
  });

  it('should apply default given default state', () => {
    // having
    const { state } = store;

    // when
    // then
    expect(state.foo).toBe(true);
    expect(state.bar).toBe('test');
  });

  describe('set state', () => {
    it('should not mutate current state', () => {
      // having
      const { state } = store;

      // when
      store.setState({
        foo: false,
      });

      // then
      expect(state).not.toBe(store.state);
    });

    it('should change state partially', () => {
      // when
      store.setState({
        foo: false,
      });

      // then
      expect(store.state.foo).toBe(false);
      expect(store.state.bar).toBe('test');
    });

    it('should change full state', () => {
      // when
      store.setState({
        bar: 'new_test',
        foo: false,
      });

      // then
      expect(store.state.foo).toBe(false);
      expect(store.state.bar).toBe('new_test');
    });
  });
});
