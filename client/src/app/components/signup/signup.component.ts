import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UserService]
})

export class SignupComponent {
  users: User[];
  name: string;
  password: string;
  email: string;
  zipcode: number;
  address: string;
  mobileno: number;

  constructor(private userService: UserService,
              private router: Router) {

    this.userService.getUsers().subscribe( users => {
      this.users = users;
    });
  }

  signup(){
    event.preventDefault();

    let user = {
      name: this.name,
      password: this.password,
      email: this.email,
      zipcode: this.zipcode,
      address: this.address,
      mobileno: this.mobileno
    };

    this.userService.addUser(user).subscribe(user => {
      if (user.success) {
        this.users.push(user);
        this.router.navigate(['home']);
      } else {
        this.router.navigate(['signup']);
      }
    });
  }

}
