export function getUXPinMergeBanner(mode = ''): string {
  return `
┌─────────┐
│         │
│  UXPin  │ {V}erge${mode ? ` - ${mode}` : ''}
│         │
└─────────┘
`;
}
