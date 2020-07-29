import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-session',
  templateUrl: './check-session.component.html',
  styleUrls: ['./check-session.component.scss']
})
export class CheckSessionComponent implements OnInit {

  constructor(private sessionService: SessionService, private router:Router) { }

  ngOnInit() {
    this.sessionService.checkSession()
    .pipe(first())
    .subscribe(
      (resp) => {
        console.log(resp);
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        console.log(err);
        this.router.navigate(['/login']);
      }
    )
  }

}
