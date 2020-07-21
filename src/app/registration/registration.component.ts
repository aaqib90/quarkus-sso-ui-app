import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../helpers/confirmPassword.check';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';


import { first } from 'rxjs/operators';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm:FormGroup;
  submitted = false;
  constructor(private formBuilder:FormBuilder,
              private userService:UserService,
            private router:Router) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(8)]],
      confirmPassword:['',[Validators.required, Validators.minLength(8)]]
    },{
      validator:MustMatch('password', 'confirmPassword')
    });
  }
      // convenience getter for easy access to form fields
      get f() { return this.registrationForm.controls};
      onSubmit() {
        console.log(this.registrationForm);
        
        this.submitted = true;
        // this.router.navigate(['/2fa-verification'], this.registrationForm.value.email);
        // if(this.registrationForm.invalid) {
        //   return;
        // }
        
        this.userService.onCreateUser(this.registrationForm.value)
        .pipe(first())
        .subscribe(
          (result) => {
            console.log(result);
            this.router.navigate(['/2fa-verification'], this.registrationForm.value);
          },
          (err) => {
            console.log(err);
          }
        )
        
      }

}
