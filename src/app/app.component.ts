import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { doesUsernameExist, passwordStrength } from './validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public form = this._fb.group({
    username: ['', [Validators.required], [doesUsernameExist()]],
    password: ['', [Validators.required, passwordStrength()]],
  });

  constructor(private _fb: FormBuilder) {}

  onFormSubmit() {
    if (this.form.valid) {
      console.log(this.form);
    }
  }
}
