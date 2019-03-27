import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../_services/login.service';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {};
  submitted = true;
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() { }

  login(): void {
    this.loginService.login(this.user)
      .subscribe(result => {
        if (result === undefined) {
           this.submitted = false;
          } else {
          this.router.navigate(['/chat']);
          this.submitted = true;
        }
      });
  }


}
