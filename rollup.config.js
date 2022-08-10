import typescript from 'rollup-plugin-typescript2'; 
import babel from 'rollup-plugin-babel'; 
export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.esm.js',
            format: 'esm'
        }, {
            file: 'dist/index.cjs.js',
            format: 'cjs'
        }, {
            file: 'dist/index.umd.js',
            format: 'umd'
        }
    ],
    plugins: [typescript(),babel()]
}