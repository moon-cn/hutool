/** @type {import('rollup').RollupOptions} */
// ---cut---
export default {
    input: 'src/main.js',
    output: [{
        name: 'hutool',
        file: 'dist/index.umd.js',
        format: 'umd'
    },
        {
            file: 'dist/index.es.js',
            format: 'es'
        }
    ]
};