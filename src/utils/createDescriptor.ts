// import { AnyObj } from 'types/common';
// import { TypeDescriptor } from 'types/types';
// import { isAnyObj } from './isType';

// function createChildDescriptor<CV extends AnyObj>(
//   value: CV,
//   parent: TypeDescriptor<AnyObj, AnyObj, AnyObj>,
// ): TypeDescriptor<CV, typeof parent['value'], typeof parent['root']['value']> {
//   const descriptor: TypeDescriptor<CV, AnyObj, AnyObj> = {
//     isRoot: false,
//     value,
//     get root() {
//       return parent.root;
//     },
//     parent,
//     optional: new Set(),
//     nullable: new Set(),
//     get children() {
//       return children;
//     },
//   };

//   const children: typeof descriptor['children'] = Object.entries(value).reduce(
//     (obj, [key, childValue]) => {
//       if (isAnyObj(childValue)) {
//         obj[key] = createChildDescriptor(value, descriptor);
//       }
//       return obj;
//     },
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     {} as any,
//   );

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any

//   return descriptor;
// }

// export function createRootDescriptor<T extends AnyObj>(
//   value: T,
// ): TypeDescriptor<T> {
//   const descriptor: TypeDescriptor<T> = {
//     isRoot: true,
//     value,
//     get parent() {
//       return descriptor;
//     },
//     get root() {
//       return descriptor;
//     },
//     optional: new Set(),
//     nullable: new Set(),
//     get children() {
//       return children;
//     },
//   };

//   const children: typeof descriptor['children'] = Object.keys(value).reduce(
//     (obj, key) => {
//       const childValue = value[key];
//       if (isAnyObj(childValue)) {
//         // const child = createChildDescriptor(childValue, descriptor);
//       }

//       return obj;
//     },
//     {},
//   );

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   Object.entries(value).forEach(([key, value]) => {
//     if (isAnyObj(value)) {
//       descriptor.children[key] = createChildDescriptor(value, descriptor);
//     }
//   });

//   return descriptor;
// }

// const desc = createRootDescriptor({
//   one: 2,
//   three: 4,
//   five: {
//     six: 6,
//     seven: {
//       eight: 9,
//     },
//   },
// });

// type Check = typeof desc['children']['five']['children'];
