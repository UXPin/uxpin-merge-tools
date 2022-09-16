export class Store<T extends object> {
  public state: T;

  constructor(defaultState: T = {} as T) {
    this.state = defaultState;
  }

  public setState(props: Partial<T>): void {
    this.state = Object.assign({}, this.state, props);
  }
}
