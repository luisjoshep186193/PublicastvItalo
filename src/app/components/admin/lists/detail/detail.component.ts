import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Elemento, ElementId } from '../../../../interfaces/element.interface';



@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  private CARPETA_FILES = 'lists';
  elementos: ElementId [] = [];
  elementosNew: ElementId [] = [];
  constructor(private activatedRoute: ActivatedRoute) {
    this.getLists();
    this.activatedRoute.params.subscribe(params => {
       console.log( params['idx'] );
       console.log('currentlist: ', localStorage.getItem('currentList'));
       console.log(JSON.parse(localStorage.getItem('currentList')));
         this.elementosNew.push(JSON.parse(localStorage.getItem('currentList')));
       // this.elementosNew.push(this.elementos.find(element => element.id === params['idx']));
    });
   }

  ngOnInit() {
  }
  getLists() {
    this.elementos = [];
    var retrievedObject = localStorage.getItem(this.CARPETA_FILES);
    retrievedObject = retrievedObject.substring(0, retrievedObject.length - 3) + '"';
    const cadena = JSON.parse(retrievedObject);
    const splitted = cadena.split('.,');
    console.log('splitted', splitted);
    splitted.forEach(element => {
       const nuevoElemtoID: ElementId = JSON.parse(element);
       if (!this.elementos.find(e => e.id === nuevoElemtoID.id)) {
        this.elementos.push(nuevoElemtoID);
        console.log('added: ', nuevoElemtoID.id);
       }
    });
    return JSON.parse(retrievedObject);
  }
}
