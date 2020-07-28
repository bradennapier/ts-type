export function isCustomInspect(key: unknown): boolean {
  return (
    String(Symbol.prototype.valueOf.call(key)) === 'Symbol(util.inspect.custom)'
  );
}
