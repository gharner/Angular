import { logToConsole } from './capture.utilities';

// utilities/async-utils.ts
export async function withAbortableTimeout<T>(fn: (signal: AbortSignal) => Promise<T>, timeoutMs: number, timeoutMessage = 'Operation timed out'): Promise<T> {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

	try {
		return await fn(controller.signal);
	} catch (err: any) {
		if (controller.signal.aborted) {
			throw new Error(timeoutMessage);
		}
		throw err;
	} finally {
		clearTimeout(timeoutId);
	}
}

// async.utilities.ts
export function logExecutionTimeSync<T>(label: string, fn: () => T): T {
	const start = performance.now();
	try {
		return fn();
	} finally {
		const duration = performance.now() - start;
		logToConsole(`[⏱️ ${label}] completed in ${duration.toFixed(2)}ms`);
	}
}

export async function logExecutionTime<T>(label: string, fn: () => Promise<T> | T): Promise<T> {
	const start = performance.now();
	try {
		const result = await fn();
		return result;
	} finally {
		const duration = performance.now() - start;
		logToConsole(`[⏱️ ${label}] completed in ${duration.toFixed(2)}ms`);
	}
}

/**
 * Returns a `.then()`-friendly wrapper for logExecutionTime to support chained usage.
 *
 * Example:
 *    await someAsyncThing().then(logExecutionTime('someAsyncThing'));
 */
export function logExecutionTimeThen<T>(label: string): (result: T) => T {
	const start = performance.now();
	return result => {
		const duration = performance.now() - start;
		logToConsole(`[⏱️ ${label}] completed in ${duration.toFixed(2)}ms`);
		return result;
	};
}
