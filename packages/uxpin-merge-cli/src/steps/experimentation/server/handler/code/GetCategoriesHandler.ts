import { IncomingMessage, ServerResponse } from 'http';
import { OK } from 'http-status-codes';
import { DesignSystemSnapshot } from '../../../../serialization/DesignSystemSnapshot';
import { getProjectMetadata } from '../../../metadata/getProjectMetadata';
import { getAccessControlHeaders } from '../../headers/getAccessControlHeaders';
import { getNoCacheHeaders } from '../../headers/getNoCacheHeaders';
import { ExperimentationServerContext } from '../../startExperimentationServer';
import { RequestHandler } from '../RequestHandler';

export const COMPONENT_TYPE: 'code-sync-component' = 'code-sync-component';

export class GetCategoriesHandler implements RequestHandler {
  constructor(private context: ExperimentationServerContext) {}

  public async handle(request: IncomingMessage, response: ServerResponse): Promise<void> {
    response.writeHead(OK, {
      'Content-Type': 'application/json',
      ...getAccessControlHeaders(request.headers),
      ...getNoCacheHeaders(),
    });
    response.write(await this.getCategoriesResponse());
    response.end();
  }

  private async getCategoriesResponse(): Promise<string> {
    const meta: DesignSystemSnapshot = await this.getMetadata();

    const response: SingleCategoryResponse[] = meta.categorizedComponents.map((category, index) => ({
      id: index + 1,
      isDefault: index === 0,
      name: category.name,
      sortIndex: index,
      type: COMPONENT_TYPE,
    }));

    return JSON.stringify(response);
  }

  private async getMetadata(): Promise<DesignSystemSnapshot> {
    return getProjectMetadata(this.context.uxpinDirPath);
  }
}

interface SingleCategoryResponse {
  id: number;
  isDefault: boolean;
  name: string;
  sortIndex: number;
  type: typeof COMPONENT_TYPE;
}
