import { OutgoingHttpHeaders } from 'http';

export function getNoCacheHeaders():OutgoingHttpHeaders {
  return {
    'Cache-Control': 'no-cache',
  };
}
