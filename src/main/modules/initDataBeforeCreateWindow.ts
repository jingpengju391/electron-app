import path from 'path'
import { app } from 'electron'
import DbService from '@service/db'

export default async function initDefaultWorkspace() {
	// init db work space
	await initializeDBService()

	//in this file, you can include other time-consuming data for the application
	//code. you can also place them in separate functions and call them here.
}

// client db & create db table
async function initializeDBService() {
	const isPackaged = app.isPackaged
	const filePath = isPackaged
		? path.resolve(import.meta.env.MAIN_VITE_APP_DB_PATH_PACKAGED)
		: path.resolve(__dirname, import.meta.env.MAIN_VITE_APP_DB_PATH)
	await DbService.initializeDB(filePath)
}
