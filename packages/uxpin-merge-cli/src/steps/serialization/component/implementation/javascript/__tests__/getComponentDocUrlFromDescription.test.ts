import { getComponentDocUrlFromDescription } from '../getComponentDocUrlFromDescription';

describe('getComponentDocUrlFromDescription', () => {
  let description:string = '';
  describe('when description is empty', () => {
    it('returns undefined', () => {
      expect(getComponentDocUrlFromDescription(description)).toBeUndefined();
    });
  });

  describe('when description does not contain @uxpindocurl annotation', () => {

    description = 'Description string without annotation';

    it('returns undefined', () => {
      expect(getComponentDocUrlFromDescription(description)).toBeUndefined();
    });
  });

  describe('when description contains single-line @uxpindocurl annotation', () => {

    description = '@uxpindocurl https://app.uxpin.com/test';

    it('returns docUrl url', () => {
      expect(getComponentDocUrlFromDescription(description)).toMatch('https://app.uxpin.com/test');
    });

    describe('when description contains multi-line @uxpindocurl annotation', () => {

      description = `Some component description
     @uxpindocurl https://app.uxpin.com/test
     Another description line`;

      it('returns extracted docUrl url', () => {
        expect(getComponentDocUrlFromDescription(description)).toMatch('https://app.uxpin.com/test');
      });
    });
  });
});
