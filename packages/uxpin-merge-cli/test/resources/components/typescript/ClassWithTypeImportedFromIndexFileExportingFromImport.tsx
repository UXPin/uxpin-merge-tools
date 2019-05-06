import * as React from 'react';
import { WithAppProviderProps } from './shorthandedImportExportingFromTsx/AppProvider/utilities/withAppProvider';

interface Props {
  propLocal:WithAppProviderProps;
}

export default class ClassWithTypeImportedFromIndexFileExportingFromImport extends React.Component<Props> {
  public render():JSX.Element {
    const { propLocal} = this.props;
    return (
      <div>
        <button>
          {propLocal}
        </button>
      </div>
    );
  }
}
