import { ComponentPresetElementProps } from '../ComponentPreset';
import { PartialProps } from '../jsx/JSXSerializationResult';
import { replaceElementsWithReferencesInProps } from '../replaceElementsWithReferencesInProps';

describe('replaceElementsWithReferencesInProps', () => {
  it('should replace single element with reference', () => {
    // given
    const props: PartialProps = {
      icon: {
        name: 'Button',
        props: {
          uxpId: '1',
        },
        uxpinPresetElementType: 'CodeComponent',
      },
    };
    const expectedProps: ComponentPresetElementProps = {
      icon: { uxpinPresetElementId: '1' },
    };

    // when
    const result: ComponentPresetElementProps = replaceElementsWithReferencesInProps(props);

    // then
    expect(result).toEqual(expectedProps);
  });

  it('should remove a few elements in array', () => {
    // given
    const props: PartialProps = {
      icon: [
        {
          name: 'Button',
          props: {
            uxpId: '1',
          },
          uxpinPresetElementType: 'CodeComponent',
        },
        {
          name: 'Button',
          props: {
            uxpId: '2',
          },
          uxpinPresetElementType: 'CodeComponent',
        },
      ],
    };
    const expectedProps: ComponentPresetElementProps = {
      icon: ['R$<Button uxpId={"1"} />$R', 'R$<Button uxpId={"2"} />$R'],
    };

    // when
    const result: ComponentPresetElementProps = replaceElementsWithReferencesInProps(props);

    // then
    expect(result).toEqual(expectedProps);
  });

  it('should remove deeply nested elements', () => {
    // given
    const props: PartialProps = {
      data: [
        {
          subtitle: [
            'some text',
            {
              name: 'Icon',
              props: {
                uxpId: '1',
              },
              uxpinPresetElementType: 'CodeComponent',
            },
          ],
          title: 'some title',
        },
        {
          subtitle: {
            name: 'Icon',
            props: {
              uxpId: '1',
            },
            uxpinPresetElementType: 'CodeComponent',
          },
          title: 'some title',
        },
        {
          subtitle: 'some subtitle',
          title: 'some title',
        },
      ],
    };
    const expectedProps: ComponentPresetElementProps = {
      data: [
        { subtitle: ['some text', 'R$<Icon uxpId={"1"} />$R'], title: 'some title' },
        { subtitle: 'R$<Icon uxpId={"1"} />$R', title: 'some title' },
        { subtitle: 'some subtitle', title: 'some title' },
      ],
    };

    // when
    const result: ComponentPresetElementProps = replaceElementsWithReferencesInProps(props);

    // then
    expect(result).toEqual(expectedProps);
  });

  it('should return empty object', () => {
    // given
    const props: PartialProps = {};
    const expectedProps: ComponentPresetElementProps = {};

    // when
    const result: ComponentPresetElementProps = replaceElementsWithReferencesInProps(props);

    // then
    expect(result).toEqual(expectedProps);
  });
});
