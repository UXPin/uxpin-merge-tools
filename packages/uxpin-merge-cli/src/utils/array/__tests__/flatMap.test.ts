import { flatMap } from '../flatMap';

describe('flatMap', () => {
  it('flattens single-level array returned from function iterating on the input array', () => {
    // given
    function stringifyingDuplicate(n:number):string[] {
      return [`${n}`, `${n}`];
    }

    // when
    const result:string[] = flatMap([-1, 0, 1], stringifyingDuplicate);

    // then
    expect(result).toEqual(['-1', '-1', '0', '0', '1', '1']);
  });
});
