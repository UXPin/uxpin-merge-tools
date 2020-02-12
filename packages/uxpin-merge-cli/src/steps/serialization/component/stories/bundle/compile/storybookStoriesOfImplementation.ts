export function storiesOf(storySetName:string, storySetModule:NodeModule):StoryBuilder {
  return new StoryBuilder(storySetName, storySetModule);
}

class StoryBuilder {
  constructor(storySetName:string, private storySetModule:NodeModule) {
  }

  public add(storyName:string, storyFunction:() => any):this {
    this.storySetModule.exports[storyName] = storyFunction;
    return this;
  }

  // tslint:disable-next-line:prefer-function-over-method
  public addDecorator():void {
    return;
  }

  // tslint:disable-next-line:prefer-function-over-method
  public addParameters():void {
    return;
  }
}

export function addDecorator():void {
  return;
}

export function addParameters():void {
  return;
}
