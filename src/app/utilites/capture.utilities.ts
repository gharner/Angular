import * as Sentry from '@sentry/angular';
import { LogOptions } from './advanced-debugging.utilities';

export function logToConsole(functionName: string, data?: any, options: LogOptions = {}): void {
	if (window.location.hostname !== 'localhost') return;

	const {
		logStyle = 'color: red; font-weight: bold; padding: 2px 6px; border-radius: 4px;',
		groupLabel,
		groupStyle = 'color: gray; font-weight: bold; background: #eee; padding: 2px 6px; border-radius: 4px;',
		expanded,
		forceRoot = false,
	} = options;

	if (forceRoot) {
		// Close all open groups before starting a new one
		Object.keys(logToConsole.openGroups).forEach(closeLogGroup);
	}

	if (groupLabel) {
		if (!logToConsole.openGroups[groupLabel]) {
			expanded ? console.group(`%c${groupLabel}`, groupStyle) : console.groupCollapsed(`%c${groupLabel}`, groupStyle);
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
	logToConsole(`%cError in ${functionName}`, error, { logStyle: 'color: red; font-weight: bold; padding: 2px 6px; border-radius: 4px;' });
}
