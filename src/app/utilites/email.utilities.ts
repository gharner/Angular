import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { AdvancedDebugging } from './advanced-debugging.utilities';

export interface EmailMessage {
	to: string | string[];
	cc?: string | string[];
	bcc?: string | string[];
	message: { subject: string; text?: string; html?: string };
}

export class SendEmail {
	private advancedDebugging = new AdvancedDebugging();

	constructor(private firestore: Firestore) {}

	private normalizeEmails(input: string | string[] | undefined): string[] | undefined {
		if (typeof input === 'string') {
			return input
				.split(',')
				.map(email => email.trim())
				.filter(email => email !== '');
		}
		return input;
	}

	private cleanUndefinedFields(obj: any): any {
		const cleaned: any = {};
		for (const key in obj) {
			if (obj[key] !== undefined) {
				cleaned[key] = obj[key];
			}
		}
		return cleaned;
	}

	async writeEmailToFirestore(message: EmailMessage) {
		try {
			// Normalize and clean the message object
			const normalizedMessage: EmailMessage = {
				...message,
				to: this.normalizeEmails(message.to) ?? [],
				cc: this.normalizeEmails(message.cc),
				bcc: this.normalizeEmails(message.bcc),
			};

			const cleanedMessage = this.cleanUndefinedFields(normalizedMessage);
			this.advancedDebugging.always('writeEmailToFirestore=>message', cleanedMessage);

			const ref = collection(this.firestore, 'mas-email');
			this.advancedDebugging.always('writeEmailToFirestore=>firestore instance', this.firestore);

			await addDoc(ref, cleanedMessage).catch(err => {
				this.advancedDebugging.captureError('addDoc failed:', err);
			});
		} catch (error) {
			this.advancedDebugging.captureError('writeEmailToFirestore', error, { emailMessage: message });
		}
	}
}
