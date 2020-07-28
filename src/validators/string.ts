import { ERROR_INVALID_VALUE } from 'utils/errorCodes';
import { throwError } from 'utils/throwError';

export function createErrorMessage(key: string, value: unknown): string {
  return `property "${key}" invalid, expected a string but got ${typeof value}`;
}

export function guard(value: unknown): value is string {
  return typeof value === 'string';
}

export function coerce(value: unknown): string {
  return String(value);
}

export function validate(key: string, value: unknown): asserts value is string {
  if (typeof value !== 'string') {
    throwError(ERROR_INVALID_VALUE, createErrorMessage(key, value));
  }
}
