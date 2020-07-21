import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../helpers/confirmPassword.check';

@Component({
  selector: 'app-two-fa-verification',
  templateUrl: './two-fa-verification.component.html',
  styleUrls: ['./two-fa-verification.component.scss']
})
export class TwoFaVerificationComponent implements OnInit {
 private qcUrl:string;
 email: string = null;
 qrCodeForm:FormGroup;
 //'https://chart.googleapis.com/chart?chs=200x200&chld=M%%7C0&cht=qr&chl=otpauth%3A%2F%2Ftotp%2FProlifics-+Quarkus+POC%3Aaaqib.jawed%40prolifics.com%3Fsecret%3Dnull%26issuer%3DProlifics-+Quarkus+POC';
  constructor(
    private formBuilder:FormBuilder,
    private userService: UserService,
    private router: Router
  ) { 
    const navigation:any = this.router.getCurrentNavigation();
    this.email = navigation.extras.email;
    console.log(navigation);
    
  }

  ngOnInit() {
    this.qrCodeForm = this.formBuilder.group({
      pin:['', [Validators.required, Validators.minLength(6)]]
    });
    // if(this.email == null) {
    //   alert('Wrong redirection!');
    //   this.router.navigate(['/login']);
    // }

    const obj = this.userService.getQRUrl(this.email).subscribe(
      (result:any) => {
        console.log(result);
        if(result.status)
          this.qcUrl = result.qrcodeURL;
        else
          console.log(result);
      },
      (err) => {
        console.log(err);
      }
    )
    //  console.log(obj);
  }

  onSubmit() {
    const obj: any = {
      email : this.email,
      pin: this.qrCodeForm.controls.pin.value
    }
    this.userService.verify2FaPin(obj)
    .pipe(first())
    .subscribe(
      (resp) => {
        alert('Verified')
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err);
        console.log(err);
      }
    )
    
  }

}
