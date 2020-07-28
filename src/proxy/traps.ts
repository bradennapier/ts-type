import { AnyObj } from 'types/common';
import { TypeDescriptor } from 'types/types';
import { DESCRIPTOR, MODULE_NAME } from 'utils/constants';
import { getValue } from 'utils/getValue';
import { isCustomInspect } from 'utils/isCustomInspect';

export function get(descriptor: TypeDescriptor, key: string | number | symbol) {
  if (key === DESCRIPTOR) {
    return descriptor;
  }

  if (typeof key === 'symbol' && isCustomInspect(key)) {
    return () => getValue(descriptor);
  }

  const value = getValue(descriptor);

  const result = Reflect.get(value, key);

  return result;
}

export function defineProperty(): boolean {
  throw new Error(
    `[${MODULE_NAME}] | ERROR | defineProperty | It is an error to define properties on schemas`,
  );
}

export function setPrototypeOf(): boolean {
  throw new Error(
    `[${MODULE_NAME}] | ERROR | defineProperty | It is an error to set the prototype of schemas`,
  );
}

export function getPrototypeOf(descriptor: TypeDescriptor): AnyObj {
  return Reflect.getPrototypeOf(getValue(descriptor));
}

export function preventExtensions(): boolean {
  return true;
}

export function isExtensible(): boolean {
  return true;
}
