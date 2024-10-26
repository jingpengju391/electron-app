import path from 'path'
import { app } from 'electron'
import DbService from '@service/db'

export async function initializeDBService() {
    const isPackaged = app.isPackaged
    const filePath  = isPackaged ? 
      path.resolve(import.meta.env.MAIN_VITE_APP_DB_PATH_PACKAGED) : 
      path.resolve(__dirname, import.meta.env.MAIN_VITE_APP_DB_PATH)
    await DbService.initializeDB(filePath)
}