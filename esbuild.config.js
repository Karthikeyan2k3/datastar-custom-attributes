import esbuild from 'esbuild'
import { readdirSync } from 'fs'

// Find all data-*.ts files in the project root
const entryPoints = readdirSync('.')
  .filter(f => f.startsWith('data-') && f.endsWith('.ts'))

esbuild.build({
    entryPoints,
    bundle: true,
    format: 'esm',
    outdir: 'dist',
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