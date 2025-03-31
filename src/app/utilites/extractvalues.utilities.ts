export type AnyObject = { [key: string]: any };

export function extractUniqueValues(obj: AnyObject, keysToFind: string[]): string[] {
	const resultArray: string[] = [];
	const visitedObjects = new WeakSet<AnyObject>();

	function recurse(currentObj: AnyObject) {
		if (visitedObjects.has(currentObj)) return;
		visitedObjects.add(currentObj);

		for (const key in currentObj) {
			if (Object.prototype.hasOwnProperty.call(currentObj, key)) {
				if (keysToFind.includes(key)) {
					resultArray.push(currentObj[key]);
				}
				if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
					recurse(currentObj[key]);
				}
			}
		}
	}

	recurse(obj);

	const arr = extractStringValues(resultArray);
	const uniqueValues = [...new Set(arr)];
	return uniqueValues;
}

export function extractStringValues(input: any[]): string[] {
	return input
		.map(item => {
			if (typeof item === 'string') return item;
			if (item && typeof item === 'object' && 'stringValue' in item) {
				return item.stringValue;
			}
			return null;
		})
		.filter((value): value is string => typeof value === 'string');
}
