import { externalizeDepsPlugin } from 'electron-vite'
import { dirPath } from './util'
import alias from './alias'

export default {
    entry: dirPath('main'),
    build: {
        outDir: dirPath('main'),
        rollupOptions: {
            output: {
                manualChunks(id){}
            },
            external: []
        },
        watch: {
            buildDelay: 300
        }
    },
    resolve: {
        alias
    },
    plugins: [externalizeDepsPlugin()]
}