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

	public getOpenGroups(): string[] {
		return Object.entries(this.openGroups)
			.filter(([, isOpen]) => isOpen)
			.map(([key]) => key);
	}

	log(functionName: string, data?: any, overrides: LogOptions = {}): void {
		if (window.location.hostname !== 'localhost') return;

		const options = { ...this.options, ...overrides };
		const { logStyle = 'color: inherit;', groupLabel, groupStyle = 'font-weight: bold;', expanded, forceRoot } = options;

		if (forceRoot) {
			this.closeAllGroups();
		}

		if (groupLabel && !this.openGroups[groupLabel]) {
			expanded ? console.group(`%c${groupLabel}`, groupStyle) : console.groupCollapsed(`%c${groupLabel}`, groupStyle);
			this.openGroups[groupLabel] = true;
		}

		console.log(`%c${functionName}`, logStyle, ...(data !== undefined ? [data] : []));
	}

	captureError(functionName: string, error: any, additionalData: any = {}, overrides: LogOptions = {}): void {
		Sentry.captureException(error, {
			extra: { functionName, ...additionalData },
		});

		this.log(`Error in ${functionName}`, error, {
			...overrides,
			logStyle: 'color: red; font-weight: bold;',
		});
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

	/**
	 * Immediately closes all open groups. If `force` is not "once", stores the flag.
	 */
	setForceRoot(force: boolean | 'once'): this {
		this.closeAllGroups();
		if (force !== 'once') {
			this.options.forceRoot = force;
		}
		return this;
	}

	closeGroup(groupLabel: string): this {
		if (this.openGroups[groupLabel]) {
			console.groupEnd();
			delete this.openGroups[groupLabel];
		}
		return this;
	}

	closeNDeep(n: number): this {
		for (let i = 0; i < n; i++) {
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
		this.timers[label] = performance.now();
		this.log(`⏱️ Start ${label}`);
		return this;
	}

	endPerformance(label = 'default'): number {
		const endTime = performance.now();
		const startTime = this.timers[label];

		if (startTime === undefined) {
			this.log(`⚠️ No performance timer found for "${label}"`);
			return -1;
		}

		const duration = endTime - startTime;
		delete this.timers[label];
		this.log(`⏱️ End ${label}`, `${duration.toFixed(2)}ms`);

		return duration;
	}

	// Optional helper
	hasPerformance(label = 'default'): boolean {
		return this.timers[label] !== undefined;
	}

	private closeAllGroups(): void {
		Object.keys(this.openGroups).forEach(label => {
			console.groupEnd();
			delete this.openGroups[label];
		});
	}
}
