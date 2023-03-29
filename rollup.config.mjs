import { nodeResolve } from '@rollup/plugin-node-resolve';

// // rollup.config.mjs
// // single bundle with inlined dynamic imports
// export default {
//   input: 'app.js',
//   output: {
//     file: 'bundle.js',
//     format: 'cjs',
//     inlineDynamicImports: true
//   },
//   plugins: [nodeResolve()]
// };

// rollup.config.mjs
// separate dynamic imports
export default {
  input: 'app.js',
  output: {
    dir: 'dist',
    format: 'es',
    inlineDynamicImports: false
  },
  preserveEntrySignatures: false,
  plugins: [
    nodeResolve(),
  ]
};