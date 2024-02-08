import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[StructuralDirective]',
})
export class StructuralDirective {
	private hasView = false;

	constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef) {}

	@Input() set StructuralDirective(condition: boolean) {
		console.log(`DELIVERED is '${condition}`);

		if (condition && !this.hasView) {
			this.viewContainer.createEmbeddedView(this.templateRef);
			this.hasView = true;
		} else if (!condition && this.hasView) {
			this.viewContainer.clear();
			this.hasView = false;
		}
	}
}
