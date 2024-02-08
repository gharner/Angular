import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-reactive-form',
	templateUrl: './reactive-form.component.html',
	styleUrls: ['./reactive-form.component.css'],
})
export class ReactiveFormComponent implements OnInit, OnDestroy {
	public exampleForm!: FormGroup;
	private componentSubscription!: Subscription;

	constructor(private formBuilder: FormBuilder) {
		this.exampleForm = this.formBuilder.group({
			exampleText1: new FormControl({ value: '', disabled: false }),
			nestedGroup: this.formBuilder.group({
				exampleText2: new FormControl({ value: '', disabled: false }),
			}),
		});

		this.componentSubscription = this.exampleForm.valueChanges.subscribe(changes => {
			console.log(changes);
		});
	}

	ngOnInit(): void {
		this.exampleForm.get('nestedGroup')?.get('exampleText2')?.setValidators([Validators.required]);
		console.log(this.exampleForm);
	}

	onSubmit(event: any) {
		console.log(this.exampleForm.valid);
	}

	ngOnDestroy(): void {
		if (this.componentSubscription) this.componentSubscription.unsubscribe();
	}
}
