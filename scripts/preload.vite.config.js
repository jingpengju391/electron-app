import { externalizeDepsPlugin } from 'electron-vite'
import { dirPath } from './util'
import alias from './alias'

export default {
    entry: dirPath('preload'),
    build: {
        outDir: dirPath('preload'),
        rollupOptions: {
            output: {
                manualChunks(id){}
            }
        }
    },
    resolve: {
        alias
    },
    plugins: [externalizeDepsPlugin()]
}