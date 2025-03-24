import * as Sentry from '@sentry/angular';

export class DateTimeUtils {
	/**
	 * Parses a date input (string or Date) and ensures it's a valid Date object.
	 * Captures errors in Sentry and returns null if invalid.
	 */
	private static parseDate(d: Date | string): Date | null {
		try {
			if (typeof d === 'string') {
				d = new Date(d);
			}
			if (isNaN(d.getTime())) {
				throw new Error(`Invalid date input: ${d}`);
			}
			return d;
		} catch (error) {
			Sentry.captureException(error);
			return null;
		}
	}

	/**
	 * Universal date formatter that handles different formatting needs.
	 * @param d Date object or date string
	 * @param mode The format mode: 'date', 'time24', 'time12', 'utc', 'friendly', 'local', 'midnight'
	 */
	static formatDate(d: Date | string, mode: 'date' | 'time24' | 'time12' | 'utc' | 'friendly' | 'local' | 'midnight', daysOffset = 0): string {
		const date = this.parseDate(d);
		if (!date) return 'Invalid date';

		if (mode === 'midnight') {
			date.setDate(date.getDate() + daysOffset);
			date.setHours(0, 0, 0, 0);
			return date.toISOString().slice(0, 19);
		}

		if (mode === 'local') {
			const tzOffset = new Date().getTimezoneOffset() * 60000;
			return new Date(Date.now() - tzOffset).toISOString().slice(0, 19);
		}

		if (mode === 'date') return date.toISOString().slice(0, 10);
		if (mode === 'time24') return date.toISOString().slice(11, 16);
		if (mode === 'utc') return date.toISOString().slice(0, 16);

		if (mode === 'time12') {
			const formattedTime = date.toLocaleString('en-US', {
				hour: 'numeric',
				minute: 'numeric',
				hour12: true,
			});
			const match = formattedTime.match(/(\d+):(\d+)(\s?[APM]+)/i);
			if (match) {
				return `${match[1]}:${match[2].padStart(2, '0')}${match[3]}`;
			}
			return formattedTime;
		}

		if (mode === 'friendly') {
			const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
			const dayName = days[date.getDay()];
			const month = date.toLocaleString('en-US', { month: 'short' });
			return `${dayName} ${month} ${date.getDate().toString().padStart(2, '0')} ${this.formatDate(date, 'time12')}`;
		}

		return 'Invalid mode';
	}

	/** Calculates age from a given birthdate */
	static calculateAge(birthday: string): number {
		const birthDate = this.parseDate(birthday);
		if (!birthDate) return -1;

		const today = new Date();
		let age = today.getFullYear() - birthDate.getFullYear();
		const m = today.getMonth() - birthDate.getMonth();

		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	}

	/** Converts a YYYY-MM-DD date string to "MM/DD/YYYY" (display) or returns it as is (store) */
	static formatDateStringByMode(dateString: string, mode: 'display' | 'store'): string {
		const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
		if (!dateRegex.test(dateString)) {
			Sentry.captureException(new Error(`Invalid Date ${dateString}. Required format YYYY-MM-DD`));
			return 'Invalid date';
		}

		const [year, month, day] = dateString.split('-');
		return mode === 'store' ? `${year}-${month}-${day}` : `${month}/${day}/${year}`;
	}
}
