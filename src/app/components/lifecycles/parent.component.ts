import {
  AfterContentChecked,
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent
  implements OnInit, AfterContentInit, AfterContentChecked
{
  @ViewChild('wrapper') wrapper!: ElementRef | string;
  @ContentChild('contentWrapper') content!: ElementRef | string;
  public userName: string;
  public isChildDestroyed = false;
  constructor() {
    this.userName = 'Maria';
  }

  updateUser() {
    if (this.userName !== 'Chris') {
      this.userName = 'Chris';
    } else {
      this.userName = 'John';
    }
  }

  doNothing() {
    this.userName = this.userName;
  }
  ngOnInit() {
    console.log('ngOnInit from the parent component');
  }

  /*
	ngAfterContentInit
	
	This method is called only once during the component’s lifecycle, after the first ngDoCheck. Within this hook, we have access for the first time to the ElementRef of the ContentChild after the component’s creation; after Angular has already projected the external content into the component’s view.

	We projected content from the Parent component to the Child component. At this point, we only have access to the projected content (contentWrapper  has the value of the projected content). Moreover, the component’s template is not initialized yet (wrapper is undefined). It will be initialized and ready to be accessed on the ngAfterViewInit hook
	*/
  ngAfterContentInit() {
    console.log('ngAfterContentInit - wrapper', this.wrapper);
    console.log('ngAfterContentInit - contentWrapper', this.content);
  }

  /*
	ngAfterContentChecked 
	
	This method is much like ngAfterContentInit except it is called with every change detection in the component’s lifecycle.

	*/

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked triggered');
  }

  destroy() {
    this.isChildDestroyed = true;
  }
}
