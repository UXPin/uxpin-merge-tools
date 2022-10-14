import { writeFile } from 'fs-extra';

export function writeToFile(filePath: string, content: string): Promise<void> {
  return writeFile(filePath, content, { encoding: 'utf-8' });
}
