import { getComponentDocUrlFromDescription } from '../getComponentDocUrlFromDescription';


describe('getComponentDocUrlFromDescription', () => {

    describe('when description is empty', () => {
        const description:string ='';

        it('returns undefined', () => {
            expect(getComponentDocUrlFromDescription(description)).toBeUndefined();
        });
    });

    describe('when description does not contain @uxpindocurl annotation', () => {
        const description:string = 'Description string without annotation';
    
        it('returns undefined', () => {
          expect(getComponentDocUrlFromDescription(description)).toBeUndefined();
        });
      });

   describe('when description contains single-line @uxpindocurl annotation', () => {
    const description:string = '@uxpindocurl https://app.uxpin.com/test';

    it('returns docUrl url', () => {
      expect(getComponentDocUrlFromDescription(description)).toMatchObject({
        url: 'https://app.uxpin.com/test',
      });
    });

    describe('when description contains multi-line @uxpindocurl annotation', () => {
        const description:string = `Some component description
    
    @uxpindocurl https://app.uxpin.com/test
    Another description line`;
    
        it.only('returns extracted docUrl url', () => {
          expect(getComponentDocUrlFromDescription(description)).toMatchObject({
            url: 'https://app.uxpin.com/test',
          });
        });
      });

  });   










})