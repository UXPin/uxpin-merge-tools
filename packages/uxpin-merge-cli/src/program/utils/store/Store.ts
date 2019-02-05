export class Store<T extends Object> {
  public state:T;

  constructor(defaultState:T = {} as T) {
    this.state = defaultState;
  }

  setState(props:Partial<T>) {
    this.state = Object.assign({}, this.state, props);
  }
}
