export class ScheduleProcessor {
	private events: any[];

	constructor(events: any[]) {
		this.events = events;
	}

	addProgramIds(programs: any[]): this {
		this.events = this.events
			.map(event => {
				const matchedProgram = programs.find(program => event.summary === program.name || event.summary === program.testCategory);

				return matchedProgram ? { ...event, programId: matchedProgram.id } : null;
			})
			.filter(event => event !== null); // Remove unmatched events

		return this; // Enables chaining
	}

	getEvents(): any[] {
		return this.events;
	}
}
