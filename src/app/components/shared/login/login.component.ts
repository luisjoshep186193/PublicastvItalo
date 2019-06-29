import { Component, OnInit } from '@angular/core';
import { Elemento } from 'src/app/interfaces/element.interface';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
user: Elemento = {} as Elemento;
Swal = require('sweetalert2');
recordarme = false;
  constructor(private authLogin: AuthService,
              private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('email')) {
      this.user.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }
  login(form: NgForm) {
    if ( !form.valid ) {
     return;
    }
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'espere por favor!'
    });
    Swal.showLoading();
    this.authLogin.login( this.user ).subscribe(
     resp => {
       Swal.close();
       this.router.navigateByUrl('/home');

       if ( this.recordarme ) {
          localStorage.setItem('email', this.user.email);
       }
     }, (err) => {
      Swal.fire({
        type: 'error',
        title: 'Error al autenticar',
        text: err.error.error.message
      });
        console.log(err.error.error.message);
     }
    );
    console.log(form);
  }
}
