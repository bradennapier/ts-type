import { MODULE_NAME } from './constants';

export function throwError(code: string, msg: string): void {
  throw new Error(`[ERROR] | ${MODULE_NAME} | ${code.toUpperCase()} | ${msg}`);
}
