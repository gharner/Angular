import * as Sentry from '@sentry/angular';

export function captureError(functionName: string, error: any, additionalData: any = {}): void {
	Sentry.captureException(error, {
		extra: {
			functionName,
			...additionalData,
		},
	});
	logToConsole(`Error in ${functionName}:`, error);
}

export function logToConsole(functionName: string, data?: any): void {
	if (window.location.hostname === 'localhost') {
		console.log(`${functionName}=>`, data);
	}
}
