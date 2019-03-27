import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = {};
  submitted = true;
  ack = true;

  constructor(private registerService: LoginService) { }

  ngOnInit() {
  }
  register(): void {
    this.registerService.register(this.user)
      .subscribe(result => {
        if (result === undefined) {
          this.submitted = false;
          this.ack = true;
        }
        // tslint:disable-next-line:one-line
        else {
          this.submitted = true;
          this.ack = false;
        }
      });
  }

}
