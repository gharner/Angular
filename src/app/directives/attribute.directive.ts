import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
	selector: '[AttributeDirective]',
})
export class AttributeDirective implements OnInit {
	@Input('AttributeDirective') selectedBackground: string = 'lightyellow';
	@HostBinding('style.backgroundColor') backgroundColor: string = this.selectedBackground;
	constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
	ngOnInit(): void {
		//this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'lightgrey');
	}

	@HostListener('mouseenter') mouseover(eventData: Event) {
		//this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent');
		this.backgroundColor = 'transparent';
	}

	@HostListener('mouseleave') mouseleave(eventData: Event) {
		//this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'lightgrey');
		this.backgroundColor = this.selectedBackground;
	}
}
