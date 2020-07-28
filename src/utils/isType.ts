import { AnyObj, PossibleValueTypes } from 'types/common';

export function isType<V>(value: V): PossibleValueTypes {
  if (value === undefined) return 'undefined';
  if (value === null) return 'null';

  const type = typeof value;
  switch (type) {
    case 'object': {
      if (Array.isArray(value)) {
        return 'array';
      }
      if (value instanceof Map || value instanceof WeakMap) {
        return 'map';
      }
      if (value instanceof Set) {
        return 'set';
      }
      if (value instanceof RegExp) {
        return 'regexp';
      }
      if (value instanceof Date) {
        return 'date';
      }
      return 'object';
    }
    case 'number': {
      if (Number.isNaN(value)) {
        return 'nan';
      }
      return 'number';
    }
    case 'symbol':
    case 'function':
    case 'boolean':
    case 'string':
    case 'undefined':
      return type;
    default: {
      return 'unknown';
    }
  }
}

export function isAnyObj(value: unknown): value is AnyObj {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return true;
  }
  return false;
}
