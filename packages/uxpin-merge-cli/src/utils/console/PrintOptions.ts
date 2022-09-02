type OutStreamName = 'stdout' | 'stderr';

export interface PrintOptions {
  color?: PrintColor;
  underline?: boolean;
  channel?: OutStreamName;
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
