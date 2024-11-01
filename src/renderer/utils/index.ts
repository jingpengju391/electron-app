export async function sleep(ms: number = 1000): Promise<void> {
	return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number = 600): (...args: Parameters<T>) => void {
	let timer: ReturnType<typeof setTimeout> | null = null
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return function (this: any, ...args: Parameters<T>) {
		timer !== null && clearTimeout(timer)
		timer = setTimeout(() => fn.apply(this, args), delay)
	} as (...args: Parameters<T>) => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle(fn: (...args: any[]) => void, delay: number = 600): (...args: any[]) => void {
	let lock = false
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return (...args: any[]) => {
		if (lock) return
		fn(...args)
		lock = true
		setTimeout(() => {
			lock = false
		}, delay)
	}
}

export const copyText = (function () {
	if (navigator.clipboard) {
		return (text: string) => {
			navigator.clipboard.writeText(text)
		}
	} else {
		return (text: string) => {
			const input = document.createElement('input')
			input.setAttribute('value', text)
			document.body.appendChild(input)
			input.select()
			document.execCommand('copy')
			document.body.removeChild(input)
		}
	}
})()
