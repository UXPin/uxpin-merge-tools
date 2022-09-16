const DEFAULT_TIMEOUT = 5000;

export function setTimeoutBeforeAll(currentTimeout: number): void {
  beforeAll(() => (jest as any).setTimeout(currentTimeout));
  afterAll(() => (jest as any).setTimeout(DEFAULT_TIMEOUT));
}
