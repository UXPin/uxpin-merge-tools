export function getUXPinMergeBanner(mode:string = ''):string {
  return `
┌─────────┐
│         │
│  UXPin  │ {\\/}erge${mode ? ` - ${mode}` : ''}
│         │
└─────────┘
`;
}
