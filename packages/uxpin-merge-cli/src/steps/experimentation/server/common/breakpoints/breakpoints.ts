export interface Breakpoint {
  height:number;
  name:string;
  version:number;
  width:number;
}

export const breakpoints:Breakpoint[] = [
  {
    height: 768,
    name: 'Wide 1440',
    version: 0,
    width: 1440,
  },
  {
    height: 480,
    name: 'iPhone (320px)',
    version: 1,
    width: 320,
  },
  {
    height: 320,
    name: 'Phone Landscape (480px)',
    version: 2,
    width: 480,
  },
  {
    height: 768,
    name: 'Tablets (600px)',
    version: 3,
    width: 600,
  },
  {
    height: 1024,
    name: 'iPads (768px)',
    version: 4,
    width: 768,
  },
  {
    height: 768,
    name: 'Standard websites (992px)',
    version: 5,
    width: 992,
  },
  {
    height: 768,
    name: 'iPad Landscape (1024px)',
    version: 6,
    width: 1024,
  },
  {
    height: 768,
    name: 'Wide websites (1224px)',
    version: 7,
    width: 1224,
  },
];
