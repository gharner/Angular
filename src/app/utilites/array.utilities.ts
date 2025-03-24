export class ArrayUtils {
	static shuffle(array: any[]): any[] {
		let currentIndex = array.length,
			randomIndex;

		while (currentIndex !== 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
			[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
		}

		return array;
	}

	static clone<T>(arr: T[]): T[] {
		return JSON.parse(JSON.stringify(arr));
	}
}
