import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { logToConsole } from '.';

export class FormUtils {
	static findInvalidControlsRecursive(formToInvestigate: FormGroup | FormArray): string[] {
		var invalidControls: string[] = [];
		let recursiveFunc = (form: FormGroup | FormArray) => {
			Object.keys(form.controls).forEach(field => {
				const control = form.get(field);
				if (control?.status === 'INVALID') {
					logToConsole(`FormUtils.findInvalidControlsRecursive`, control);
					if (control.errors && control.errors['alert']) {
						invalidControls.push(control.errors['alert']);
					} else {
						if (control instanceof FormControl) invalidControls.push(`invalid ${field}`);
					}
				}
				if (control instanceof FormGroup) {
					recursiveFunc(control);
				} else if (control instanceof FormArray) {
					recursiveFunc(control);
				}
			});
		};

		recursiveFunc(formToInvestigate);
		return invalidControls;
	}
}
