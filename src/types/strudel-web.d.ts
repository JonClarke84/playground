/**
 * Minimal typings for @strudel/web (ships untyped). initStrudel() also
 * registers `evaluate`/`hush` as globals — declared in src/lib/music.ts.
 */
declare module '@strudel/web' {
  export function initStrudel(options?: { prebake?: () => unknown }): unknown
}
