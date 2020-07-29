import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { LoaderService } from '../services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private userService:UserService,
    private loaderService:LoaderService,
    private toastr:ToastrService,
    private router:Router) { }

  ngOnInit() {
  }

  logout() {
    this.userService.logout("").pipe(first()).subscribe(
      (resp) => {
        this.router.navigate(['/login']);
      },
      (err) => {

      }
    )
  }
}
