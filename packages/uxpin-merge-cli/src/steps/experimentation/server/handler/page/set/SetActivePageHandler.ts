import { IncomingMessage, ServerResponse } from 'http';
import { OK } from 'http-status-codes';
import {
  AllComponentsCollection,
  AllPresetsCollection,
  CodeSyncMetadata,
} from '../../../../../../common/types/CodeSyncMetadata';
import { ComponentPresetRevision } from '../../../../../../common/types/ComponentPresetRevision';
import { PageData } from '../../../../../../common/types/PageData';
import { flatMap } from '../../../../../../utils/array/flatMap';
import { ComponentDefinition } from '../../../../../serialization/component/ComponentDefinition';
import { DesignSystemSnapshot } from '../../../../../serialization/DesignSystemSnapshot';
import { getProjectMetadata } from '../../../../metadata/getProjectMetadata';
import { getAccessControlHeaders } from '../../../headers/getAccessControlHeaders';
import { ExperimentationServerContext } from '../../../startExperimentationServer';
import { ImplementationErrorHandler } from '../../error/ImplementationErrorHandler';
import { RequestHandler } from '../../RequestHandler';
import { getComponentId } from './pageData/component/getComponentId';
import { getComponentRevisionId } from './pageData/component/getComponentRevisionId';
import { getPresetId } from './pageData/preset/getPresetId';

export class SetActivePageHandler implements RequestHandler {

  constructor(private context:ExperimentationServerContext) {
  }

  public handle(request:IncomingMessage, response:ServerResponse):void {
    this.respondWithPageContent(response).catch((error) => {
      new ImplementationErrorHandler(error).handle(request, response);
    });
  }

  private async respondWithPageContent(response:ServerResponse):Promise<void> {
    const body:string = JSON.stringify(await this.getPageContent());
    response.writeHead(OK, {
      'Content-Type': 'text/xml; charset=utf-8',
      ...getAccessControlHeaders(this.context.uxpinDomain),
    });
    response.write(body);
    response.end();
  }

  private async getPageContent():Promise<PageData> {
    return {
      code_sync: await this.getCodeSyncMetadata(),
      component_version: null,
      components_master_ids: [],
      components_versions: [],
      components_versions_map: [],
      is_component: '0',
      last_update: '0',
      page: {
        canvas: {
          props: { storedElements: [] },
          type: 'Canvas',
          v: '2.0',
        },
      },
    };
  }

  private async getCodeSyncMetadata():Promise<CodeSyncMetadata> {
    const { epid, port, uxpinDirPath } = this.context;
    const metadata:DesignSystemSnapshot = await getProjectMetadata(uxpinDirPath);
    return {
      bundles: {
        [epid.revisionId]: `http://localhost:${port}/code/library.js`,
      },
      components: this.getComponentsCollection(metadata),
      presets: this.getPresetsCollection(metadata),
    };
  }

  private getComponentsCollection(metadata:DesignSystemSnapshot):AllComponentsCollection {
    const designSystemId:string = this.getDesignSystemId();
    const { revisionId } = this.context.epid;
    const components:ComponentDefinition[] = flatMap(metadata.categorizedComponents, (c) => c.components);
    return components.reduce<AllComponentsCollection>((all, component) => {
      const componentId:string = getComponentId(designSystemId, component.info);
      all[componentId] = {
        componentId,
        info: component.info,
        name: component.name,
        properties: component.properties,
        revisionId,
      };
      return all;
    }, {});
  }

  private getPresetsCollection(metadata:DesignSystemSnapshot):AllPresetsCollection {
    const designSystemId:string = this.getDesignSystemId();
    const presets:ComponentPresetRevision[] = flatMap(metadata.categorizedComponents, (category) => {
      return flatMap(category.components, (component) => {
        const componentId:string = getComponentId(designSystemId, component.info);
        const { revisionId } = this.context.epid;
        return component.presets.map<ComponentPresetRevision>((preset, index) => {
          return {
            ...preset,
            componentRevisionId: getComponentRevisionId(revisionId, componentId),
            presetId: getPresetId(designSystemId, component.info.presets![index].path),
            sortIndex: index,
          };
        });
      });
    });
    return presets.reduce<AllPresetsCollection>((all, preset) => {
      all[preset.presetId] = preset;
      return all;
    }, {});
  }

  private getDesignSystemId():string {
    const [designSystemId] = this.context.epid.revisionId.split('_');
    return designSystemId;
  }
}
