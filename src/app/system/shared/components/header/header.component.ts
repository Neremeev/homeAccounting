import { Component, OnInit } from '@angular/core';
import {interval} from "rxjs/index";
import {User} from "../../../../shared/models/users.models";
import {AuthService} from "../../../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  resultDate: any;
  interval$ = interval(1000);
  user: User;

  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  ngOnInit() {

    this.user = JSON.parse(window.localStorage.getItem('user'));
    this.interval$.subscribe(() => {
      const date = Date.now();
      this.resultDate = new Date(date);
    })

  }

  onLogout() {
    this.authService.logOut();
    this.router.navigate(['/login'])
  }

}
