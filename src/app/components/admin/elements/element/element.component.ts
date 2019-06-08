import { Component, OnInit } from '@angular/core';
import { ElementModel } from 'src/app/models/element.model';
import { NgForm } from '@angular/forms';
import { ElementsService } from 'src/app/services/elements.service';
import { FileModel } from '../../../../models/file.model';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit {

  estaSobreElemento = false;
  archivos: FileModel[] = [];
  element = new ElementModel();
  constructor(private elementService: ElementsService) {

   }

  ngOnInit() {
  }
  borrarElementos() {
  this.archivos = [];
  }
  cargarImagenes() {
    this.elementService.cargarImagenesFirebase(this.archivos);
  }
  guardar(form: NgForm) {
    if (form.invalid) {
      console.log('formulario invalido');
      return;
    }
    if (this.element.id) {
      this.elementService.actualizarElement(this.element).subscribe(resp =>{
        console.log(resp);
        });
    } else {
      this.elementService.crearElement(this.element).subscribe(resp =>{
        console.log(resp);
        });
    }
    }
}
