import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: 'app-viewchild',
	templateUrl: './viewchild-example.component.html',
	styleUrls: ['./viewchild-example.component.css'],
})
export class ViewchildExample implements OnInit {
	@ViewChild('viewchildexample', { static: true }) viewchildexample!: ElementRef;

	ngOnInit(): void {
		this.viewchildexample.nativeElement.innerHTML = 'View Child Example';
		console.log(this.viewchildexample);
	}
}
