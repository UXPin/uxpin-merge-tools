import { printWarning } from '../../utils/console/printLine';

export function yesNo(question: string): Promise<boolean> {
  printWarning(`👉 ${question} (y/n) ?`);
  return new Promise((resolve) => {
    const listener = (data: any) => {
      process.stdin.removeListener('data', listener);
      const response = data.toString().trim().toLowerCase();
      if (['yes', 'y'].includes(response)) {
        resolve(true);
        return;
      }

      resolve(false);
    };
    process.stdin.on('data', listener);
  });
}
