import { Typed } from 'types/types';
import * as traps from './traps';

export function createRootProxy<T>(fn: T): T & Typed<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const proxy = new Proxy<any>(fn, traps);
  return proxy as T & Typed<T>;
}
