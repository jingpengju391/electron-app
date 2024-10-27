export default {
	set(key: string, value: string) {
		sessionStorage.setItem(key, JSON.stringify(value))
	},
	get(key: string) {
		const obj = sessionStorage.getItem(key)
		if (obj && obj !== 'undefined' && obj !== null) {
			return JSON.parse(obj)
		}
		return ''
	},
	remove(key: string) {
		key && sessionStorage.removeItem(key)
	}
}
