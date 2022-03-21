import typescript from 'rollup-plugin-typescript2'; 
import babel from 'rollup-plugin-babel'; 
export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.esm.js',
            format: 'esm', 
            sourcemap: true
        }, {
            file: 'dist/index.cjs.js',
            format: 'cjs', 
            sourcemap: true
        }, {
            file: 'dist/index.umd.js',
            name: 'GLWidget',
            format: 'umd',
            sourcemap: true
        }
    ],
    plugins: [typescript(),babel()]
}