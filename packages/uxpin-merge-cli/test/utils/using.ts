interface Using<T> {
  describe(description: string, testSuite: (testCase: T) => void): void;
}

export function using<T>(cases: T[]): Using<T> {
  return {
    describe(description: string, testSuite: (testCase: T) => void): void {
      describe(description, () => {
        cases.forEach((testCase: any) => {
          testSuite(testCase);
        });
      });
    },
  };
}
