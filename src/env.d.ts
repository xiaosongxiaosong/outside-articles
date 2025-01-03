/// <reference types="@rsbuild/core/types" />

declare module '*.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
