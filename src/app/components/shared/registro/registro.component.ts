import { Component, OnInit } from '@angular/core';
import { Elemento } from '../../../interfaces/element.interface';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  user: Elemento = {} as Elemento;
  recordarme = false;
  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if ( form.invalid ) {
      return;
    }
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'espere por favor!'
    });
    Swal.showLoading();
    this.authService.nuevousuario(this.user).subscribe(
      resp => {
        Swal.close();
        if ( this.recordarme ) {
          localStorage.setItem('email', this.user.email);
       }
        this.router.navigateByUrl('/login');
          console.log(resp);
      }, (err) => {
        Swal.fire({
          type: 'error',
          title: 'Error al registrar',
          text: err.error.error.message
        });
          console.log(err.error.error.message);
      });

  }
}
