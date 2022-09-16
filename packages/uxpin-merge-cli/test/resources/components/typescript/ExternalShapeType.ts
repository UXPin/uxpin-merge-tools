export interface ExternalShapeType {
  name: string;
  value: number;
  nested: NestedShape;
}

export interface NestedShape {
  keyA: string;
  keyB: string;
}
