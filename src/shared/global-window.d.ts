import { ElectronApi } from '.'
import type { Api } from './dataModelTypes/api'

declare global {
	interface Window {
		electron: ElectronApi
		api: Api
	}
}
