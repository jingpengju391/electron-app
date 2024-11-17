import HttpClient from './client'

const defaultConfig = {}
const defaultMethod = {}

export const $http = (url: string, method: string, params: any, options: any) => {
	const defaultParams = Object.assign({}, defaultConfig, defaultMethod?.[method] ?? {})
	const data = {
		...defaultParams,
		...params
	}
	return new HttpClient(url, method, data, options).SendRequest()
}
