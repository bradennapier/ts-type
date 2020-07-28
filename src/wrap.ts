import { createRootProxy } from 'proxy/createRootProxy';
import type { Infer, Typed } from 'types/types';
// import { createDescriptor } from 'utils/createDescriptor';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function typed<T>(value: T): Typed<T> {
  // const descriptor = createDescriptor(value);

  // to make it work temporarily cast since createDescriptor is broken and i want to commit example

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ({} as any) as Typed<T>;
}

export const wrap = createRootProxy(typed);

const one = { one: wrap.optional.string(), four: 3 } as const;
const two = { two: 2 } as const;

const validator = {
  foo: wrap.optional.string(),
  bar: wrap.nullable.optional.literal('bar'),
  baz: 123,
  qux: 'qux',
  // TODO wrap.not.equal(2) - not working for all values
  blah: wrap.unequal(2),
  union: wrap.optional.nullable.union([wrap.string(), wrap.number()]),
  intersect: wrap.intersection([one, two]),
  key: wrap.never(),
  undef: wrap.undefined(),
} as const;

export const schema = wrap(validator);

export type Inferred = Infer<typeof schema>;

const obj: Inferred = {
  foo: 'one',
  bar: 'bar',
  baz: 123,
  qux: 'qux',
  blah: 3,
  union: 2,
  intersect: {
    one: 'hi',
    four: 3,
    two: 2,
  },
};
