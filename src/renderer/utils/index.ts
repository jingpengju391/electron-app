export async function sleep(ms: number = 1000): Promise<void> {  
    return new Promise<void>(resolve => setTimeout(resolve, ms))
}

export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number = 600): (...args: Parameters<T>) => void {
    let timer: ReturnType<typeof setTimeout> | null = null
    return function (this: any, ...args: Parameters<T>) {
        timer !== null && clearTimeout(timer)
        timer = setTimeout(() => fn.apply(this, args), delay)
    } as (...args: Parameters<T>) => void
}

export function throttle(fn: (...args: any[]) => void, delay: number = 600): (...args: any[]) => void {
    let lock = false
    return (...args: any[]) => {
        if (lock) return
        fn(...args)
        lock = true
        setTimeout(() => {
            lock = false
        }, delay)
    }
}