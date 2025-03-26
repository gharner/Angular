import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import * as Sentry from '@sentry/angular';

export interface EmailMessage {
	to: string | string[];
	cc?: string;
	bcc?: string;
	message: { subject: string; text?: string; html?: string };
}

export class SendEmail {
	constructor(private firestore: Firestore) {}

	async writeEmailToFirestore(message: EmailMessage) {
		try {
			const ref = collection(this.firestore, 'mas-email');
			await addDoc(ref, message);
			if (window.location.hostname === 'localhost') console.log('writeEmailToFirestore=>message', message);
		} catch (error) {
			Sentry.captureException(error, {
				extra: { functionName: 'writeEmailToFirestore', emailMessage: message },
			});
			console.error('Error writing email to Firestore:', error);
		}
	}
}
