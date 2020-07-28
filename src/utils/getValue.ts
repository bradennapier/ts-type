export function getValue(descriptor: any, key?: string | number | symbol): any {
  if (typeof descriptor === 'function') {
    return descriptor;
  }

  let base;
  if ('copy' in descriptor) {
    base = descriptor.copy;
  } else {
    ({ base } = descriptor);
  }

  if (key) {
    return Reflect.get(base, key);
  }

  return base;
}
