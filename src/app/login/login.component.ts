import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';

import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted:boolean = false;
  constructor(private formBuilder:FormBuilder,
    private userService:UserService,
    private loaderService:LoaderService,
    private toastr:ToastrService,
  private router:Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(8)]],
      pin: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get f() { return this.loginForm.controls};

  onSubmit() {
    console.log(this.loginForm);
    this.submitted = true;
    this.loaderService.show();
    if(this.loginForm.valid) {
      this.userService.login(this.loginForm.value)
      .pipe(first())
      .subscribe(
        (resp) => {
          console.log(resp);
          this.loaderService.hide();
          this.toastr.success('Logged in Successfully..!', 'Success');
          this.router.navigate(['/dashboard']);
        },
        (err: HttpErrorResponse) => {
          this.loaderService.hide();
          const errorMessage = err.error.message ? err.error.message : err.error;
          this.toastr.error(errorMessage, 'Error');
          // toast need to add here
          // alert(err.message);
          console.log(err);
          
        }
      )
    } else {
      //this.loginForm.setErrors;
    }
  }


}
