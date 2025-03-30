import { SimpleChange, SimpleChanges } from '@angular/core';

export function formatSimpleChanges(changes: SimpleChanges): string[] {
	return Object.entries(changes).map(([key, change]: [string, SimpleChange]) => {
		const oldVal = formatValue(change.previousValue);
		const newVal = formatValue(change.currentValue);
		return `${key}: ${oldVal} => ${newVal}`;
	});
}

export function flattenSimpleChanges(changes: SimpleChanges): string[] {
	const result: string[] = [];

	for (const [key, change] of Object.entries(changes)) {
		const from = change.previousValue;
		const to = change.currentValue;

		// Flatten both previous and current values
		const fromFlat = flattenObject(from, key);
		const toFlat = flattenObject(to, key);

		// Merge keys to get all touched paths
		const allPaths = new Set([...Object.keys(fromFlat), ...Object.keys(toFlat)]);

		for (const path of allPaths) {
			const oldVal = formatValue(fromFlat[path]);
			const newVal = formatValue(toFlat[path]);
			result.push(`${path} => ${oldVal} → ${newVal}`);
		}
	}

	return result;
}

function flattenObject(obj: any, prefix: string = ''): Record<string, any> {
	const result: Record<string, any> = {};

	function recurse(subObj: any, path: string[]) {
		if (subObj === null || typeof subObj !== 'object') {
			result[path.join('.')] = subObj;
			return;
		}

		for (const key of Object.keys(subObj)) {
			recurse(subObj[key], [...path, key]);
		}
	}

	if (obj !== undefined) {
		recurse(obj, [prefix]);
	}

	return result;
}

function formatValue(value: any): string {
	if (value === undefined) return 'undefined';
	if (value === null) return 'null';
	if (typeof value === 'object') {
		if ('stringValue' in value) return String(value.stringValue); // Firestore-style
		try {
			return JSON.stringify(value);
		} catch {
			return '[Unserializable Object]';
		}
	}
	return String(value);
}
