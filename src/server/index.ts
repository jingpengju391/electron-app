import { IpcMainInvokeEvent } from 'electron'
import { enumeration } from './testdb/enumeration'

export async function insertToDB(_event: IpcMainInvokeEvent){
    return await enumeration.db.insertDB()
}

export async function handleFromDb(_event: IpcMainInvokeEvent, id: number){
    return await enumeration.db.queryDB(id)
}