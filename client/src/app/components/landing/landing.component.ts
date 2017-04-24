import { Component } from '@angular/core';
import { User } from '../../user';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  providers: [UserService]
})

export class LandingComponent {
  private users: User[];
  private password: string;
  private email: string;

  constructor(private userService: UserService,
              private router: Router) {

    this.userService.getUsers().subscribe( users => {
      this.users = users;
    });
  }

  validateUser() {
    const user = {
      username: this.email,
      password: this.password
    };

    this.userService.authenticateUser(user).subscribe(data => {
      if(data.success){
        this.userService.storeUserData(data.token, data.user);
        this.router.navigate(['home']);
      } else {
        this.router.navigate(['']);
      }
    });
  }
}
