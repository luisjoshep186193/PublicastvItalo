import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../../services/navbar.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
logged = false;
  constructor(public nav: NavbarService,
              private authService: AuthService,
              private router: Router) {
              }

  ngOnInit() {

    this.isLogged();
    console.log('isLogged', this.isLogged());
  }

  isLogged(): boolean {
    return this.logged = this.authService.estaAutenticado();
  }
  logOut() {
    this.authService.logout();
    this.logged = false;
    this.ngOnInit();
    this.router.navigateByUrl('/home');
  }
}
