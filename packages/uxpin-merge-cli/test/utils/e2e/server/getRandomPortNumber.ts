import { random } from 'lodash';

const PORT_MIN = 8080;
const PORT_MAX = 9080;

export function getRandomPortNumber(min: number = PORT_MIN, max: number = PORT_MAX): number {
  return random(min, max);
}
