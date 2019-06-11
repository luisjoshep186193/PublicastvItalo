import { Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PubliCasTV';
  mostrar = true;
  frase: any = {
    mensaje: 'gran poder',
    autor: 'gran responsabilidad'
  };
}
