export function getUXPinMergeBanner(mode:string = ''):string {
  return `
┌─────────┐
│         │
│  UXPin  │ {V}erge${mode ? ` - ${mode}` : ''}
│         │
└─────────┘
`;
}
