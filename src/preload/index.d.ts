import { ElectronApi } from '@shared'
import type { Api } from '@shared/dataModelTypes/api'

declare global {
  interface Window {
    electron: ElectronApi
    api: Api
  }
}
