// save-models-batch.util.ts
import { doc, getFirestore, writeBatch } from '@angular/fire/firestore';
import { captureError, logToConsole } from '../utilities';

export async function saveModelsBatch<T extends { id: string; raw: any }>(models: T[], collectionPath: string, mode: boolean = true): Promise<void> {
	const firestore = getFirestore();
	const chunkSize = 500;

	const start = performance.now();

	const chunks = chunkArray(models, chunkSize);

	for (let i = 0; i < chunks.length; i++) {
		const chunk = chunks[i];
		const batch = writeBatch(firestore);

		for (const model of chunk) {
			try {
				const ref = doc(firestore, collectionPath, model.id);
				batch.set(ref, model.raw, { merge: mode });
			} catch (error) {
				captureError('saveModelsBatch=>prepareError', error, { id: model.id });
			}
		}

		try {
			await batch.commit();
		} catch (error) {
			captureError('saveModelsBatch=>commitError', error, { chunkIndex: i });
		}
	}

	const duration = performance.now() - start;
	logToConsole('saveModelsBatch=>completed', {
		collectionPath,
		total: models.length,
		chunks: chunks.length,
		duration: `${duration.toFixed(2)}ms`,
	});
}

function chunkArray<T>(arr: T[], size: number): T[][] {
	const chunks: T[][] = [];
	for (let i = 0; i < arr.length; i += size) {
		chunks.push(arr.slice(i, i + size));
	}
	return chunks;
}
