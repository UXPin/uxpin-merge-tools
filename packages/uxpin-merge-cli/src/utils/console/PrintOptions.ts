export interface PrintOptions {
  color?:PrintColor;
  underline?:boolean;
}

export enum PrintColor {
  BLACK = 30,
  RED = 31,
  GREEN = 32,
  YELLOW = 33,
  BLUE = 34,
  MAGENTA = 35,
  CYAN = 36,
  WHITE = 37,
}
