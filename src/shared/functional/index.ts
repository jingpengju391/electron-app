import { _arity, _curry1, _curry2, _clone, _isNumber, _has, _isArguments, _equals } from './internals'

export const once = _curry1(function once<T, F extends (...args: any[]) => T>(fn: F): F {
	let called = false
	let result: T
	return _arity(fn.length, function (this: any) {
		if (called) return result

		called = true
		result = fn.apply(this, arguments as any)
		return result
	} as F)
})

export const clone = _curry1(function clone<T extends { clone?: Function }>(value: T): T {
	return value != null && typeof value.clone === 'function' ? value.clone() : _clone(value, [], [], true)
})

export const range = _curry2(function range(from: any, to: any): number[] {
	if (!(_isNumber(from) && _isNumber(to))) {
		throw new TypeError('Both arguments to range must be numbers')
	}

	const result: any = []
	let n = from

	while (n < to) {
		result.push(n)
		n += 1
	}
	return result
})

export const omit = _curry2(function omit<T>(names: (keyof T)[], obj: T): Partial<T> {
	const result = {} as Partial<T>
	const index = {} as { [key in keyof T]: number }
	let idx = 0

	while (idx < names.length) {
		index[names[idx]] = 1
		idx += 1
	}

	for (const prop in obj) {
		if (!Object.prototype.hasOwnProperty.call(index, prop)) {
			result[prop] = obj[prop]
		}
	}

	return result
})

export const pick = _curry2(function pick<T>(names: (keyof T)[], obj: any): Partial<T> {
	const result = {} as { [key in keyof T]: any }
	let idx = 0

	while (idx < names.length) {
		if (names[idx] in obj) {
			result[names[idx]] = obj[names[idx]]
		}
		idx += 1
	}

	return result
})

export const equals = _curry2(function equals(a: any, b: any) {
	return _equals(a, b, [], [])
})
