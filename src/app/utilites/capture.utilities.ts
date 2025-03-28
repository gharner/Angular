import * as Sentry from '@sentry/angular';

export type LogOptions = {
	logStyle?: string;
	groupLabel?: string;
	groupStyle?: string;
	forceRoot?: boolean;
};

export function logToConsole(functionName: string, data?: any, options: LogOptions = {}): void {
	if (window.location.hostname !== 'localhost') return;

	const {
		logStyle = 'color: lightblue; font-weight: bold; padding: 2px 6px; border-radius: 4px;',
		groupLabel,
		groupStyle = 'color: gray; font-weight: bold; background: #eee; padding: 2px 6px; border-radius: 4px;',
		forceRoot = false,
	} = options;

	if (forceRoot) {
		// Close all open groups before starting a new one
		Object.keys(logToConsole.openGroups).forEach(closeLogGroup);
	}

	if (groupLabel) {
		if (!logToConsole.openGroups[groupLabel]) {
			console.groupCollapsed(`%c${groupLabel}`, groupStyle);
			logToConsole.openGroups[groupLabel] = true;
		}
	}

	console.log(`%c${functionName}`, logStyle, ...(data !== undefined ? [data] : []));
}

logToConsole.openGroups = {} as Record<string, boolean>;

export function closeLogGroup(groupLabel: string): void {
	if (logToConsole.openGroups[groupLabel]) {
		console.groupEnd();
		delete logToConsole.openGroups[groupLabel];
	}
}

export function captureError(functionName: string, error: any, additionalData: any = {}, options: LogOptions = {}): void {
	Sentry.captureException(error, {
		extra: {
			functionName,
			...additionalData,
		},
	});
	logToConsole(`Error in ${functionName}`, error, options);
}
