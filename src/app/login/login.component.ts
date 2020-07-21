import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private formBuilder:FormBuilder,
    private userService:UserService,
  private router:Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(8)]],
      pin: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    console.log(this.loginForm);
    if(this.loginForm.valid) {
      this.userService.login(this.loginForm.value)
      .pipe(first())
      .subscribe(
        (resp) => {
          console.log(resp);
          this.router.navigate(['/dashboard']);
        },
        (err: Error) => {
          alert(err.message);
          console.log(err);
          
        }
      )
    } else {
      //this.loginForm.setErrors;
    }
  }


}
