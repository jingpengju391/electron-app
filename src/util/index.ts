// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function singleton<T extends new (...args: any[]) => any>(className: T): T & (new (...args: ConstructorParameters<T>) => InstanceType<T>) & InstanceType<T> {
	let instance: InstanceType<T>
	const proxy = new Proxy(className, {
		construct(target, args) {
			if (instance) {
				console.warn('current class need is sing class!')
			} else {
				instance = Reflect.construct(target, args)
			}
			return instance
		}
	})
	className.prototype.constructor = proxy
	return proxy as T & (new (...args: ConstructorParameters<T>) => InstanceType<T>) & InstanceType<T>
}

export function performChunk<T>(datas: T[], consumer: (item: T, index: number) => void): void {
	if (datas.length === 0) return
	let i = 0
	function _run() {
		if (i === datas.length) return

		globalThis.requestIdleCallback((idle) => {
			while (idle.timeRemaining() > 0 && i < datas.length) {
				const item = datas[i]
				consumer(item, i)
				i++
			}
			_run()
		})
	}

	_run()
}
