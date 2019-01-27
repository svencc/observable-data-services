import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../shared/model/user';
import {Router} from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
    ) {
  }

  ngOnInit() {

  }

  login(email: string, password: string): void {
    this.userService.login(email, password)
      .subscribe(
        () => this.router.navigateByUrl('/home'),
        console.log,
        () => console.log('complete')
    )
  }

}
