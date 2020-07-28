import { Typed, TypeDescriptor } from 'types/types';
import * as traps from './traps';

export function createProxy<T>(descriptor: TypeDescriptor<T>): Typed<T> {
  const proxy = new Proxy(descriptor, traps);
  return (proxy as unknown) as Typed<T>;
}
