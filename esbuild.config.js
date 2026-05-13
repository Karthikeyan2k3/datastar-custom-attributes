import esbuild from 'esbuild'

esbuild.build({
    entryPoints: ['index.ts'],
    bundle: true,
    format: 'esm',
    outfile: 'dist/index.js',
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