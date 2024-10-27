/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

const BASEHEADER = { 'X-Requested-With': 'XMLHttpRequest' }
const uniteHeader = {
	post: BASEHEADER,
	delete: BASEHEADER,
	put: BASEHEADER,
	get: BASEHEADER
}

const afterResponse = (methods: string) => {
	return [
		function (res: string) {
			const METHOD = methods.toUpperCase() || 'GET'
			const result = JSON.parse(res)
			if (METHOD !== 'GET') {
				const msg = result?.error?.text || '操作成功！'
				const type = result.error ? 'error' : 'success'
				console.log(msg, type)
				// notification (未包含在此代码片段中)
			}
		}
	]
}

class HttpClient {
	private $http: AxiosInstance
	private url: string
	private method: string
	private data: any
	private request: any
	private response: any
	private resData: any

	constructor(url: string, method: string, data: any, options?: any) {
		this.$http = axios.create({
			headers: options?.headers?.[method] ?? uniteHeader[method],
			baseURL: options?.baseURL || '/api',
			timeout: options?.timeout || 12000,
			withCredentials: options?.withCredentials || false,
			transformResponse: options?.transformResponse || afterResponse(method)
		})
		this.url = url
		this.method = method
		this.data = data
		this.request = this.$http.interceptors.request
		this.response = this.$http.interceptors.response

		this.request.use(
			(config: AxiosRequestConfig) => {
				const token = sessionStorage.getItem('token') ? sessionStorage.getItem('token')?.replace(/"/g, '') : ''
				if (token) {
					config.headers = {
						...config.headers,
						Authorization: `Bearer ${token}`
					}
				}
				return config
			},
			(error: AxiosError) => Promise.reject(error)
		)

		this.response.use(
			(response: AxiosResponse) => JSON.parse(response?.request?.response ?? response),
			(error: AxiosError) => Promise.reject(error)
		)
	}

	SendRequest(): Promise<any> {
		const reg = /^(get|post|put|delete|patch|options|head)$/i
		const method = this.method.toUpperCase()
		if (!reg.test(method)) throw new Error(`method:${method}不是合法的请求方法`)
		const param = method === 'GET' || method === 'DELETE' ? 'params' : 'data'
		this.resData = {
			url: this.url,
			method: this.method,
			[param]: this.data
		}
		return new Promise((resolve) => {
			const STARTTIME = new Date().getTime()
			const promise = this.$http(this.resData)
			promise
				.then((response) => {
					const ENDTIME = new Date().getTime()
					console.log(`%c > ${this.url} ----------- 接口耗时 -----------> ${(ENDTIME - STARTTIME) / 1000}秒`, 'color:#40E7FF')
					resolve(response)
				})
				.catch((err) => {
					const ENDTIME = new Date().getTime()
					console.log(`%c >${this.url} ----------- 接口耗时 -----------> ${(ENDTIME - STARTTIME) / 1000}秒`, 'color:#40E7FF')
					resolve({
						error: err
					})
				})
		})
	}
}

export default HttpClient
