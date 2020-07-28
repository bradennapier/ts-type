import { AnyObj } from './common';

type GetUndefinedKeys<O> = {
  [K in keyof O]-?: O[K] extends Exclude<O[K], undefined> ? never : K;
}[keyof O];

export type Resolved<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export type ResolvedWritable<T> = T extends infer O
  ? { -readonly [K in keyof O]: O[K] }
  : never;

type MapTyped2<T, T2> = Omit<T, keyof T2> & MakeOptional<T2>;

export type MapTyped<T> = T extends AnyObj
  ? Resolved<MapTyped2<T, PickByValue<T, never> & Pick<T, GetUndefinedKeys<T>>>>
  : T;

export type ResolvedWritableDeep<T> = T extends { [key: string]: any }
  ? T extends infer O
    ? MapTyped<{ -readonly [K in keyof O]: ResolvedWritableDeep<O[K]> }>
    : never
  : T;

export type MakeOptional<T extends AnyObj, K extends keyof T = keyof T> = Omit<
  T,
  K
> &
  Partial<Pick<T, K>>;

type MapToForbidden<T extends AnyObj> = {
  [K in keyof T]+?: never;
};

export type MakeForbidden<T extends AnyObj, K extends keyof T = keyof T> = Omit<
  T,
  K
> &
  MapToForbidden<Pick<T, K>>;

export type PickByValue<T, ValueType> = Pick<
  T,
  {
    [Key in keyof T]-?: readonly [ValueType] extends readonly [T[Key]]
      ? readonly [T[Key]] extends readonly [ValueType]
        ? Key
        : never
      : never;
  }[keyof T]
>;

export type IntersectionOf<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;
