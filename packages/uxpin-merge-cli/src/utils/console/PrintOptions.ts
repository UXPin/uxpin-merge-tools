export interface PrintOptions {
  color?:PrintColor;
  underline?:boolean;
}

export enum PrintColor {
  YELLOW = 33,
  BLUE = 34,
}
