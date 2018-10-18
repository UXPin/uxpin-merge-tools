import { IncomingMessage, OutgoingHttpHeaders, ServerResponse } from 'http';
import { NOT_FOUND, OK } from 'http-status-codes';
import { readFileFromPath } from '../../../../../../utils/fs/readFileFromPath';
import { StaticFileHandler } from '../StaticFileHandler';

jest.mock('../../../../../../utils/fs/readFileFromPath');

describe('StaticFileHandler', () => {
  let request:IncomingMessage;
  let response:ServerResponse;
  let filePath:string;
  let buffer:Buffer;

  beforeEach(() => {
    request = createFakeRequest();
    response = createFakeResponse();

    filePath = './somePath';
    buffer = new Buffer(0);
    mockFile(filePath, buffer);
  });

  describe('when file exists', () => {
    it('should respond with file content', async () => {
      // given
      const handler:StaticFileHandler = new StaticFileHandler(filePath);

      // when
      await handler.handle(request, response);

      // then
      expect(response.end).toHaveBeenCalledWith(buffer, 'utf-8');
    });

    it('should respond with headers from constructor', async () => {
      // given
      const headers:OutgoingHttpHeaders = {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      };
      const handler:StaticFileHandler = new StaticFileHandler(filePath, headers);

      // when
      await handler.handle(request, response);

      // then
      expect(response.writeHead).toHaveBeenCalledWith(OK, headers);
    });
  });

  describe('when file not exists', () => {
    it('should respond with 404 status code', async () => {
      // given
      const handler:StaticFileHandler = new StaticFileHandler('not exits');

      // when
      await handler.handle(request, response);

      // then
      expect(response.writeHead).toHaveBeenCalledWith(NOT_FOUND, { 'Content-Type': 'text/plain' });
    });
  });
});

function mockFile(filePath:string, content:Buffer):void {
  ((readFileFromPath as jest.Mock).mockImplementation(async (path) => {
    if (path === filePath) {
      return content;
    }

    throw new Error('File not found');
  }));
}

function createFakeRequest():IncomingMessage {
  return {} as any;
}

function createFakeResponse():ServerResponse {
  return {
    end: jest.fn(),
    write: jest.fn(),
    writeHead: jest.fn(),
  } as any;
}
