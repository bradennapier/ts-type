export type AnyObj = { [key: string]: any };

export type Primitive = string | number | bigint | boolean | null | undefined;

export type PossibleValueTypes =
  | 'undefined'
  | 'null'
  | 'array'
  | 'map'
  | 'set'
  | 'regexp'
  | 'object'
  | 'date'
  | 'number'
  | 'nan'
  | 'symbol'
  | 'function'
  | 'boolean'
  | 'string'
  | 'unknown';
