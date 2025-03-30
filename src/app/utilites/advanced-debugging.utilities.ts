import * as Sentry from '@sentry/angular';
export type LogOptions = {
	logStyle?: string;
	groupLabel?: string;
	groupStyle?: string;
	expanded?: boolean;
	forceRoot?: boolean;
};

export class AdvancedDebugging {
	private openGroups: Record<string, boolean> = {};
	private options: LogOptions = {};
	private timers: Record<string, number> = {};

	log(functionName: string, data?: any, overrides: LogOptions = {}): void {
		if (window.location.hostname !== 'localhost') return;

		const options = { ...this.options, ...overrides };
		const { logStyle, groupLabel, groupStyle, expanded, forceRoot } = options;

		if (forceRoot) {
			this.closeAllGroups();
			this.options.forceRoot = false;
		}

		if (groupLabel && !this.openGroups[groupLabel]) {
			expanded ? console.group(`%c${groupLabel}`, groupStyle) : console.groupCollapsed(`%c${groupLabel}`, groupStyle);
			this.openGroups[groupLabel] = true;
		}

		console.log(`%c${functionName}`, logStyle, ...(data !== undefined ? [data] : []));
	}

	captureError(functionName: string, error: any, additionalData: any = {}, overrides: LogOptions = {}): void {
		Sentry.captureException(error, {
			extra: {
				functionName,
				...additionalData,
			},
		});
		this.log(`Error in ${functionName}`, error, { ...overrides, logStyle: 'color: red;' });
	}

	setOptions(options: Partial<LogOptions>): this {
		Object.assign(this.options, options);
		return this;
	}

	clearOptions(prop?: keyof LogOptions): this {
		if (prop) {
			delete this.options[prop];
		} else {
			this.options = {};
		}
		return this;
	}

	// Individual setters
	setLogStyle(style: string): this {
		this.options.logStyle = style;
		return this;
	}

	setGroupLabel(label: string): this {
		this.options.groupLabel = label;
		return this;
	}

	setGroupStyle(style: string): this {
		this.options.groupStyle = style;
		return this;
	}

	setExpanded(expanded: boolean): this {
		this.options.expanded = expanded;
		return this;
	}

	setForceRoot(force: boolean): this {
		this.options.forceRoot = force;
		return this;
	}

	closeGroup(groupLabel: string): this {
		if (this.openGroups[groupLabel]) {
			console.groupEnd();
			delete this.openGroups[groupLabel];
		}
		return this;
	}

	closeTenDeep(): this {
		for (let i = 0; i < 10; i++) {
			console.groupEnd();
		}
		return this;
	}

	// --- GETTERS ---
	getLogStyle(): string | undefined {
		return this.options.logStyle;
	}

	getGroupLabel(): string | undefined {
		return this.options.groupLabel;
	}

	getGroupStyle(): string | undefined {
		return this.options.groupStyle;
	}

	getExpanded(): boolean | undefined {
		return this.options.expanded;
	}

	getForceRoot(): boolean | undefined {
		return this.options.forceRoot;
	}

	startPerformance(label = 'default'): this {
		const startTime = performance.now();
		this.timers[label] = startTime;

		this.log(`⏱️ Start ${label}`, undefined);

		return this;
	}

	endPerformance(label = 'default'): number {
		const endTime = performance.now();
		const startTime = this.timers[label];

		if (startTime === undefined) {
			this.log(`⚠️ No performance timer found for "${label}"`, undefined);
			return -1;
		}

		const duration = endTime - startTime;
		delete this.timers[label];

		this.log(`⏱️ End ${label}`, `${duration.toFixed(2)}ms`);

		return duration;
	}

	private closeAllGroups(): void {
		while (Object.keys(this.openGroups).length > 0) {
			console.groupEnd();
			const label = Object.keys(this.openGroups)[0];
			delete this.openGroups[label];
		}
	}
}
