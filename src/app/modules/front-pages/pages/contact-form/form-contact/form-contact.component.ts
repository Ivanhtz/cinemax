import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-form-contact',
  templateUrl: './form-contact.component.html',
  styleUrls: ['./form-contact.component.scss']
})
export class FormContactComponent {
  private fb = inject(FormBuilder);
  addressForm = this.fb.group({

    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],

    shipping: ['free', Validators.required]
  });

  hasUnitNumber = false;



  onSubmit(): void {
    alert('Muchas Gracias por tu mensaje!');
    this.addressForm.reset();
  }
}
