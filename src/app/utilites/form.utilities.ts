import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class FormUtils {
	static findInvalidControlsRecursive(form: FormGroup | FormArray): string[] {
		const invalidControls: string[] = [];

		const recursiveFunc = (form: FormGroup | FormArray) => {
			Object.keys(form.controls).forEach(field => {
				const control = form.get(field);
				if (control?.invalid) {
					invalidControls.push(`invalid ${field}`);
				}
				if (control instanceof FormGroup || control instanceof FormArray) {
					recursiveFunc(control);
				}
			});
		};

		recursiveFunc(form);
		return invalidControls;
	}
}
