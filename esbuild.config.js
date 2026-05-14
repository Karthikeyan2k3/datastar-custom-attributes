import esbuild from 'esbuild'

esbuild.build({
    entryPoints: ['data-copy.ts'],
    bundle: true,
    format: 'esm',
    outfile: 'dist/data-copy.js',
    minify: process.env.NODE_ENV === 'production',
    sourcemap: true,
    target: 'es2021',
    external: ['datastar'],
}).then(() => {
    console.log('Build complete')
}).catch((error) => {
    console.error('Build failed:', error)
    process.exit(1)
})