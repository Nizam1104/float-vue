import vue from 'rollup-plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/float-vue.js',
    format: 'esm',
    name: 'FloatVue'
  },
  plugins: [
    vue({
      css: true,
      compileTemplate: true
    }),
    postcss(),
    nodeResolve(),
    commonjs()
  ],
  external: ['vue']
}
