import { externalizeDepsPlugin } from 'electron-vite'
import terser from '@rollup/plugin-terser'
import { dirPath, isDev } from './util'
import alias from './alias'

export default {
	entry: dirPath('main'),
	build: {
		outDir: dirPath('main'),
		rollupOptions: {
			output: {
				// manualChunks(id) {}
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
	plugins: [
		externalizeDepsPlugin(),
		terser({
			compress: {
				drop_console: !isDev,
				drop_debugger: !isDev
			}
		})
	]
}
