/* tslint:disable:no-var-requires */
import { GlobalWithFetchMock } from 'jest-fetch-mock';

const customGlobal:GlobalWithFetchMock = global as GlobalWithFetchMock;
customGlobal.fetchMock = require('jest-fetch-mock');
