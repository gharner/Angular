import {
  AfterViewChecked,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent
  implements OnChanges, OnInit, DoCheck, AfterViewChecked
{
  @Input() userName = '';
  @ViewChild('wrapper') wrapper!: ElementRef;
  @ContentChild('contentWrapper') content!: ElementRef;

  /*
	ngOnChanges

	This method is called once on a component's creation and then every time changes are detected in one of the component’s input properties. It receives a SimpleChanges object as a parameter, which contains information regarding which of the input properties has changed - in case we have more than one - and its current and previous values.
	
	Note that if your component has no inputs or you use it without providing any inputs, the framework will not call ngOnChanges().
	
	This is one of the lifecycle hooks which can come in handy in multiple use cases. It is very useful if you need to handle any specific logic in the component based on the received input property.

	Notice that, the received changes object has three keys currentValue, previousValue, and firstChange, they work as they sound.

	We could say that we want to change the userName value if it’s not the first change, or if the current value is only Chris. We could do anything here, let’s implement the second case.
	*/
  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges triggered', changes);

    if (!changes['userName'].isFirstChange()) {
      this.userName = 'Hello ' + this.userName;
    } else {
      this.userName = changes['userName'].previousValue;
    }
  }

  /*	
	ngOnInit

	This method is called only once during the component lifecycle, after the first ngOnChanges call. ngOnInit() is still called even when ngOnChanges() is not, which is the case when there are no template-bound inputs.

	This is one of the most used lifecycle hooks in Angular. Here is where you might set requests to the server to load content, maybe create a FormGroup for a form to be handled by that component, set subscriptions, and much more. It is where you can perform any initializations shortly after the component’s construction.

	But what is the advantage of the ngOnInit hook if the same work (initializing a FormGroup or getting data from the server) could be done on the component’s constructor()? Well, let me explain.

	Following are some of the main key points:

	The constructor()
		The default method of the class is executed when the class is instantiated and ensures proper initialization of fields in the class and its subclasses.

		Dependency Injector (DI) in Angular, analyses the constructor parameters and when it creates a new instance by calling new MyClass() it tries to find providers that match the types of the constructor parameters, resolves them, and passes them to the constructor like new MyClass(someArg)

		Should only be used to initialize class members but shouldn't do actual work. This is because the constructor is called before ngOnInit, at this point the component hasn’t been created yet, only the component class has been instantiated thus the dependencies are brought in, but the initialization code will not run.

	The ngOnInit()
		Is a life cycle hook called by Angular to indicate that Angular is done creating the component.

		Should be used for all the initialization/declaration. Because at this point the component will be initialized.
	*/
  ngOnInit() {
    console.log('ngOnInit from the child component');
  }

  /*
	ngDoCheck

	This hook can be interpreted as an “extension” of ngOnChanges. You can use this method to detect changes that Angular can’t or won’t detect. It is called in every change detection, immediately after the ngOnChanges and ngOnInit hooks.

	This hook is costly since it is called with enormous frequency; after every change detection cycle no matter where the change occurred. Therefore, its usage should be careful to not affect the user experience.

	If you click on the "Don't Update" button ngDoCheck is Triggered. How does ngDoCheck capture a change if there is no change in the @Input() property?

	Well, since Angular tracks object reference and we mutate the object without changing the reference Angular won’t pick up the changes and it will not run change detection for the component. Thus the new name property value will not be re-rendered in DOM. Luckily, we can use the ngDoCheck lifecycle hook to check for object mutation and notify Angular.
	*/
  ngDoCheck() {
    console.log('ngDoCheck triggered');
  }

  /*
	ngAfterViewInit

	This method is called only once during the component’s lifecycle, after ngAfterContentChecked. Within this hook, we have access for the first time to the ElementRef of the ViewChildren after the component’s creation; after Angular has already composed the component’s views and its child views.

	This hook is useful when you need to load content on your view that depends on its view’s components; for instance when you need to set a video player or create a chart from a canvas element

	The ngAfterContentInit() hook serves various purposes. It allows you to initialize variables specific to child components, subscribe to observables emitted by child components, and execute any other tasks that rely on accessing the fully initialized content of the directive.
	*/
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit - wrapper', this.wrapper);
  }

  /*
	ngAfterViewChecked

	This method is called once after ngAfterViewInit and then after every subsequent ngAfterContentChecked. It is called after Angular has already checked the component’s views and its child views in the current digest loop.

	If we continue clicking on the Update button many times, the ngAfterViewChecked will be triggered each time, as well as, ngDoCheck and ngAfterContentChecked.
	*/
  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked triggered');
  }

  /*
	Lastly, this method is called only once during the component’s lifecycle, right before Angular destroys it. Here is where you should inform the rest of your application that the component is being destroyed, in case there are any actions to be done regarding that information.

	Also, it is where you should put all your cleanup logic for that component. For instance, it is where you can remove any local storage information and most importantly unsubscribe observables/detach event handlers/stop timers, etc. to avoid memory leaks.

	Note that the ngOnDestroy is not called when the user refreshes the page or closes the browser. So, in case you need to handle some cleanup logic on those occasions as well, you can use the HostListener decorator.
	*/

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    console.log('Child component is destroyed! :(');
  }
}
