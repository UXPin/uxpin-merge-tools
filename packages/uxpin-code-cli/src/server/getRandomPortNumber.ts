import { random } from 'lodash';

const PORT_MIN:number = 8080;
const PORT_MAX:number = 9080;

export function getRandomPortNumber(min:number = PORT_MIN, max:number = PORT_MAX):number {
  return random(min, max);
}
