import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const currentDate = new Date();
    const selectedDate = new Date(control.value);

    if (isNaN(selectedDate.getTime())  || selectedDate === currentDate) {
      return { minDate: true };
    }

    return null;
  };
}
