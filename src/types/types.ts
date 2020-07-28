import { NULLABLE, OPTIONAL } from 'utils/constants';
import { AnyObj, Primitive } from './common';
import { IntersectionOf, MapTyped, ResolvedWritableDeep } from './utils';

export type TypeDescriptor<
  T extends AnyObj = AnyObj,
  P extends AnyObj = T,
  R extends AnyObj = T
> = {
  isRoot: boolean;
  value: T;
  nullable: Set<keyof T>;
  optional: Set<keyof T>;
  root: TypeDescriptor<R>;
  parent: TypeDescriptor<P>;
  children: MapTyped<
    {
      [K in keyof T]: [T[K]] extends [AnyObj]
        ? TypeDescriptor<T[K], T, R>
        : never;
    }
  >;
};

type CheckNullable<
  T extends AnyObj,
  V
> = T['__nullable'] extends typeof NULLABLE ? null | V : V;

type CheckOptional<
  T extends AnyObj,
  V
> = T['__optional'] extends typeof OPTIONAL ? undefined | V : V;

type CheckFlags<T extends AnyObj, V> = V extends infer O
  ? CheckNullable<T, O> | CheckOptional<T, O>
  : never;

type TypedPrototype<T extends AnyObj> = Readonly<{
  validate(value: unknown): value is ResolvedWritableDeep<T>;
  guard(value: unknown): value is ResolvedWritableDeep<T>;
  union<V extends unknown[] | readonly unknown[]>(
    arr: V,
  ): CheckFlags<T, V[number]>;
  intersection<A extends unknown[] | readonly unknown[]>(
    arr: A,
  ): CheckFlags<T, IntersectionOf<A[number]>>;

  optional: TypedPrototype<T & { readonly __optional: typeof OPTIONAL }>;
  nullable: TypedPrototype<T & { readonly __nullable: typeof NULLABLE }>;

  string<V extends string>(): CheckFlags<T, V>;
  number<V extends number>(): CheckFlags<T, V>;
  bigint<V extends bigint>(): CheckFlags<T, V>;
  regexp<V extends RegExp>(): CheckFlags<T, V>;
  symbol<V extends symbol>(): CheckFlags<T, V>;
  primitive<V extends Primitive>(): CheckFlags<T, V>;
  unknown<V extends unknown>(): CheckFlags<T, V>;
  undefined(): undefined;
  never(): never;
  any<A extends any>(): A;

  literal<V>(value: V): CheckFlags<T, V>;
  equal<V>(value: V): V;
  unequal<R, V = unknown>(value: V): R;
}>;

export type Typed<T> = TypedPrototype<T> & symbol;

export type Infer<T> = T extends Typed<infer V>
  ? ResolvedWritableDeep<V>
  : never;
