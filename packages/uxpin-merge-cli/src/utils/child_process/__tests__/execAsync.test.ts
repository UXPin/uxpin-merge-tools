import { execAsync } from '../execAsync';

describe('execAsync', () => {
  it('should execute command', async () => {
    // having
    const command:string = 'pwd';

    // when
    const result:string = await execAsync(command);

    // then
    expect(result).toContain('uxpin-code-tools/packages/uxpin-merge-cli');
  });

  it('should reject on error', async () => {
    // having
    const command:string = 'some_unknown_command';

    try {
      // when
      await execAsync(command);
    } catch (error) {
      // then
      expect(error.toString()).toContain('command not found');
    }
  });
});
