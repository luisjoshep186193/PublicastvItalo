import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Elemento, ElementId } from '../../../interfaces/element.interface';
import { FirestoreService } from '../../../services/firestore.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component ({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styles: [`.ng-invalid.ng-touched:not(form){
    border:1px solid red;
    border-left: 5px solid #a94442; /* red */
  }
  .ng-valid[required], .ng-valid.required  {
    border-left: 5px solid #42A948; /* green */
  }`]
})
export class ListsComponent implements OnInit {
  // firestore lists items
  private itemsCollection: AngularFirestoreCollection<ElementId>;
  items: Observable<ElementId[]>;


private CARPETA_FILES = 'lists';
private elementos: ElementId[] = [];
public elementsId: ElementId [] = [];
private elementsString = '';
  constructor(private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _firestoreService: FirestoreService,
    private afs: AngularFirestore) {

      this.itemsCollection = afs.collection<any>(this.CARPETA_FILES);
    /*this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        this.elementsId.push({ id, ...data });
        this.elementsString += JSON.stringify({ id, ...data }) + '.,';
        localStorage.setItem(this.CARPETA_FILES, JSON.stringify(this.elementsString));
        return { id, ...data };
      }))
      );*/
      this.items = _firestoreService.getCollection(this.CARPETA_FILES);
      // this.getLists();

}

  ngOnInit() {
  }

  guardar(forma: NgForm) {

    console.log('forma', forma);
    console.log('forma value', forma.value);
   }
   getItem(idx: number) {

    return this.elementsId.find(element => element.id === idx.toString());

   }
   details(idx: number) {
    this.elementsId = this._firestoreService.getLists(this.CARPETA_FILES);
    localStorage.setItem('currentList', JSON.stringify(this.getItem(idx)));
    this._router.navigate(['/lists/detail', idx]);
   }

   delete(idx: number) {
    // this.getLists();
     console.log('id a eliminar: ', idx);
     this.itemsCollection.doc(idx.toString()).delete().then(function() {
       console.log('Successfully deleted');
     }).catch(function(error) {
      console.error('Error removing document: ', error);
  });

   }

   crearLista () {
     this._router.navigate(['/lists/create']);
   }
   getLists() {
    this.elementsId = [];
   /* var retrievedObject = localStorage.getItem(this.CARPETA_FILES);
    console.log('retrieved object: ', retrievedObject);
    retrievedObject = retrievedObject.substring(0, retrievedObject.length - 3) + '"';
    const cadena = JSON.parse(retrievedObject);
    const splitted = cadena.split('.,');
    console.log('splitted', splitted);*/
    const splitted = this._firestoreService.getStringArray(this.CARPETA_FILES);
    splitted.forEach(element => {
       const nuevoElemtoID: ElementId = JSON.parse(element);
       if (!this.elementsId.find(e => e.id === nuevoElemtoID.id)) {
        this.elementsId.push(nuevoElemtoID);
        console.log('added: ', nuevoElemtoID.id);
       }
    });
    // return JSON.parse(retrievedObject);
  }
}
