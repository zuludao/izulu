import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
// import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image'

export default [
  {
    input: './src/node_modules/components/weather',
    output: [
      {
        dir: './dist/commonJS',
        format: 'cjs',
        exports: "auto"
      },
      {
        dir: './dist/es',
        format: 'es',
        exports: 'named'
      }
    ],
    plugins: [
      postcss({
        plugins: [],
        minimize: true,
      }),
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react'],
        extensions: [".js", ".jsx", ".css", ".png", ".jpg"]
      }),
      external(),
      resolve(),
      image()
    ]
  }
];