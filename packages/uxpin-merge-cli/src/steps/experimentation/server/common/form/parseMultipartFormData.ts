import { Fields, Files, IncomingForm } from 'formidable';
import { IncomingMessage } from 'http';

export function parseMultipartFormData(request: IncomingMessage): Promise<ParsedMultipartData> {
  return new Promise<ParsedMultipartData>((resolve, reject) => {
    const form: IncomingForm = new IncomingForm();
    form.parse(request, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }
      const result: ParsedMultipartData = { fields, files };
      resolve(result);
    });
  });
}

export interface ParsedMultipartData {
  fields: Fields;
  files: Files;
}
