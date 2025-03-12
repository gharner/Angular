export class StringUtils {
	static stringy(object: Record<string, unknown>): string {
		const cache = new WeakSet();
		return JSON.stringify(object, (key, value) => {
			if (typeof value === 'object' && value !== null) {
				if (cache.has(value)) return;
				cache.add(value);
			}
			return value;
		});
	}

	static stringyPretty(object: any): string {
		const cleanData = JSON.parse(this.stringy(object));
		return JSON.stringify(cleanData, null, '\t');
	}
}
