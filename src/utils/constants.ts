export const MODULE_NAME = 'type';

export const DESCRIPTOR = Symbol.for(`@${MODULE_NAME}/identifier/descriptor`);

export const STRING = Symbol.for(`@${MODULE_NAME}/is/string`);
export const UNDEFINED = Symbol.for(`@${MODULE_NAME}/is/undefined`);
export const NULLABLE = Symbol.for(`@${MODULE_NAME}/is/nullable`);
export const OPTIONAL = Symbol.for(`@${MODULE_NAME}/is/optional`);

export const POSITIVE = Symbol.for(`@${MODULE_NAME}/flags/positive`);
export const MAX = Symbol.for(`@${MODULE_NAME}/flags/max`);

export const VALIDATED = Symbol.for(`@${MODULE_NAME}/flags/validated`);
