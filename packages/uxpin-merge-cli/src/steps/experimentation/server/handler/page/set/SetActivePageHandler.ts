import { IncomingMessage, ServerResponse } from 'http';
import { OK } from 'http-status-codes';
import { getAccessControlHeaders } from '../../../headers/getAccessControlHeaders';
import { ExperimentationServerContext } from '../../../startExperimentationServer';
import { RequestHandler } from '../../RequestHandler';

export class SetActivePageHandler implements RequestHandler {

  constructor(private context:ExperimentationServerContext) {
  }

  public handle(request:IncomingMessage, response:ServerResponse):void {
    response.writeHead(OK, {
      'Content-Type': 'text/xml; charset=utf-8',
      ...getAccessControlHeaders(this.context.uxpinDomain),
    });
    response.write(JSON.stringify(getPageContent()), 'utf-8');
    response.end();
  }

}

function getPageContent():any {
  return {
    code_sync: { bundles: [], components: [], presets: [] },
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
