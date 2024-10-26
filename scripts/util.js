import path from 'path'
import { loadEnv } from 'vite'

export const resolvePath = p => path.resolve(__dirname, p)

export function dirPath(processName = 'renderer'){
    const mode = process.env.NODE_ENV || 'development'
    const { VITE_APP_BUILD_OUTPUTDIR } = loadEnv(mode, process.cwd())
    return resolvePath(`../${VITE_APP_BUILD_OUTPUTDIR}/${processName}`)
}