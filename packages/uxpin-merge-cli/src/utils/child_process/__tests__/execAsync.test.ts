import { execAsync } from '../execAsync';

describe('execAsync', () => {
  it('should execute command', async () => {
    // having
    const command = 'pwd';

    // when
    const result: string = await execAsync(command);

    // then
    expect(result).toContain('uxpin-merge-cli');
  });

  it('should reject on error', async () => {
    // having
    const command = 'some_unknown_command';

    try {
      // when
      await execAsync(command);
    } catch (error) {
      // then
      expect((error as Error).toString()).toContain('not found');
    }
  });
});
