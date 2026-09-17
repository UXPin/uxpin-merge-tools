import { writeFile } from '../../common/fs/projectFs';

export function writeToFile(filePath: string, content: string): Promise<void> {
  return writeFile(filePath, content);
}
