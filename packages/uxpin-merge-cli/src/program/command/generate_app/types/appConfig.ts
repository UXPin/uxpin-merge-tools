export interface SerializedProperty {
  name: string;
  type: string;
  defaultValue?: any;
  uxpinPropName?: string;
  uxpinDescription?: string;
  uxpinControlType?: string;
}

export interface SerializedComponent {
  name: string;
  category: string;
  importStatement: string;
  properties: SerializedProperty[];
}

export interface AppConfig {
  packages?: string[];
  npmrc?: string;
  webpack?: boolean | string;
  components: SerializedComponent[];
}
