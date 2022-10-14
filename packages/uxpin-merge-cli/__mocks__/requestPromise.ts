import * as requestPromise from 'request-promise';

const requestPromiseMock: jest.Mock<typeof requestPromise> = jest.genMockFromModule('request-promise');

// tslint:disable-next-line:no-default-export
export default requestPromiseMock;
