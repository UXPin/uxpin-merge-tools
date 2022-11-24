export interface SerializedProperty {
  name: string;
  type: string;
  defaultValue?: any;
}

export interface SerializedComponent {
  name: string;
  category: string;
  isExportDefault?: boolean;
  packageName: string;
  properties: SerializedProperty[];
}

export interface AppConfig {
  packages?: string[];
  npmrc?: string;
  webpack?: boolean;
  components: SerializedComponent[];
}
