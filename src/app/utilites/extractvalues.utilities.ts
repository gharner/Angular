export type AnyObject = { [key: string]: any };
export function extractUniqueValues(obj: AnyObject, keysToFind: string[]): any[] {
	const resultSet = new Set<any>();
	const visitedObjects = new WeakSet<AnyObject>();

	function recurse(currentObj: AnyObject) {
		if (visitedObjects.has(currentObj)) {
			return;
		}
		visitedObjects.add(currentObj);

		for (const key in currentObj) {
			// Using hasOwnProperty from the Object prototype
			if (Object.prototype.hasOwnProperty.call(currentObj, key)) {
				if (keysToFind.includes(key)) {
					resultSet.add(currentObj[key]);
				}
				if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
					recurse(currentObj[key]);
				}
			}
		}
	}

	recurse(obj);
	return Array.from(resultSet);
}
