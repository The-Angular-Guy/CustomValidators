import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export function passwordStrength(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let hasUppercase,
      hasLowercase,
      hasDigit,
      hasSpecialCharacter = false;
    const password = control.value as string;

    hasUppercase = /[A-Z]/.test(password);
    hasLowercase = /[a-z]/.test(password);
    hasDigit = /[0-9]/.test(password);
    hasSpecialCharacter = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(
      password
    );

    if (hasUppercase && hasLowercase && hasDigit && hasSpecialCharacter) {
      return null;
    }

    return { passwordStrength: true };
  };
}

export function doesUsernameExist(): AsyncValidatorFn {
  return (
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    const userName = control.value as string;
    return of(['testUser1', 'testUser2', 'testUser3'].includes(userName)).pipe(
      map((result: boolean) => (result ? { userNameExists: true } : null)),
      delay(3000)
    );
  };
}
