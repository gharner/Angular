import { Component, ContentChild, ElementRef, OnInit } from '@angular/core';

@Component({
	selector: 'app-content',
	templateUrl: './content.component.html',
	styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
	@ContentChild('contentchildexample', { static: true }) contentchildexample!: ElementRef;
	constructor() {}

	ngOnInit(): void {}
}
