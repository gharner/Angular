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

	captureError(functionName: string, error: any, additionalData: any = {}, overrides: LogOptions = {}): void {
		this.always(`Error in ${functionName}`, error, {
			...overrides,
			logStyle: 'color: red; font-weight: bold;',
		});

		const [component, fn] = functionName.includes('=>') ? functionName.split('=>') : [undefined, functionName];

		Sentry.withScope(scope => {
			if (component) scope.setTag('component', component);
			scope.setTag('function', fn || functionName);

			// Promote tags from additionalData if present
			if (additionalData?.tags) {
				for (const [key, value] of Object.entries(additionalData.tags)) {
					scope.setTag(key, value as string);
				}
			}

			// Everything else is extra
			for (const [key, value] of Object.entries(additionalData)) {
				if (key !== 'tags') {
					scope.setExtra(key, value);
				}
			}

			Sentry.captureException(error);
		});
	}

	clearOptions(prop?: keyof LogOptions): this {
		if (prop) {
			delete this.options[prop];
		} else {
			this.options = {};
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

	// --- GETTERS ---
	getExpanded(): boolean | undefined {
		return this.options.expanded;
	}

	getForceRoot(): boolean | undefined {
		return this.options.forceRoot;
	}

	getGroupLabel(): string | undefined {
		return this.options.groupLabel;
	}

	getGroupStyle(): string | undefined {
		return this.options.groupStyle;
	}

	getLogStyle(): string | undefined {
		return this.options.logStyle;
	}

	getOpenGroups(): string[] {
		return Object.entries(this.openGroups)
			.filter(([, isOpen]) => isOpen)
			.map(([key]) => key);
	}
	hasPerformance(label = 'default'): boolean {
		return this.timers[label] !== undefined;
	}

	log(functionName: string, data?: any, overrides: LogOptions = {}): void {
		if (window.location.hostname === 'localhost') {
			this._logInternal(functionName, data, overrides);
		} else {
			this._addBreadcrumb(functionName, data, overrides);
		}
	}

	lite(functionName: string, data?: any, overrides: LogOptions = {}): void {
		if (window.location.hostname === 'localhost') {
			this._logInternal(functionName, data, overrides);
		}
	}

	always(functionName: string, data?: any, overrides: LogOptions = {}): void {
		if (window.location.hostname !== 'localhost') {
			this._addBreadcrumb(functionName, data, overrides);
		}
		this._logInternal(functionName, data, overrides);
	}

	setExpanded(expanded: boolean): this {
		this.options.expanded = expanded;
		return this;
	}

	setForceRoot(force: boolean | 'once'): this {
		this.closeAllGroups();
		if (force !== 'once') {
			this.options.forceRoot = force;
		}
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

	setLogStyle(style: string): this {
		this.options.logStyle = style;
		return this;
	}

	setOptions(options: Partial<LogOptions>): this {
		Object.assign(this.options, options);
		return this;
	}

	setUser(user: { id?: string; email?: string } | null): this {
		Sentry.setUser(user);
		return this;
	}

	startPerformance(label = 'default'): this {
		this.timers[label] = performance.now();
		this.log(`⏱️ Start ${label}`);
		return this;
	}

	trace(label: string = 'Trace') {
		if (window.location.hostname === 'localhost') {
			console.groupCollapsed(`📍 %c${label}`, 'color: purple;');
			console.trace();
			console.groupEnd();
		}
	}

	private closeAllGroups(): void {
		Object.keys(this.openGroups).forEach(label => {
			console.groupEnd();
			delete this.openGroups[label];
		});
	}

	private _addBreadcrumb(functionName: string, data?: any, overrides: LogOptions = {}) {
		const options = { ...this.options, ...overrides };
		const breadcrumb: Sentry.Breadcrumb = {
			category: options.groupLabel || 'advanced-debug',
			message: functionName,
			level: 'info',
			data: data !== undefined ? { data } : undefined,
		};
		Sentry.addBreadcrumb(breadcrumb);
	}

	private _logInternal(functionName: string, data?: any, overrides: LogOptions = {}): void {
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
}
