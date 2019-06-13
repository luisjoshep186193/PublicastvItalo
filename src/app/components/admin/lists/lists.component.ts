import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Elemento, ElementId } from '../../../interfaces/element.interface';
import { FirestoreService } from '../../../services/firestore.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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


public CARPETA_FILES = 'lists';
public currentPlayList: ElementId;
public elementsId: ElementId [] = [];

@Input() caller = 'lists';
@Input() modalCaller = 'listElement';
@Output() addItem: EventEmitter<ElementId>;
  constructor(private _router: Router,
    private _firestoreService: FirestoreService,
    private afs: AngularFirestore) {
      this.addItem = new EventEmitter<ElementId>();
      this.itemsCollection = afs.collection<any>(this.CARPETA_FILES);
      this.items = _firestoreService.getCollection(this.CARPETA_FILES);
}

  ngOnInit() {
    console.log('in lists caller: ', this.caller);
    if (this.caller !== undefined) {
      this.CARPETA_FILES = this.caller;
    }
  }

   getItem(idx: string) {

    return this.elementsId.find(element => element.id === idx);

   }
   details(item: ElementId) {
     // console.log('click details button');
    this.elementsId = this._firestoreService.getLists(this.CARPETA_FILES);
    localStorage.setItem('currentList', JSON.stringify(this.getItem(item.id)));
    this._router.navigate(['/lists/detail', item.id]);
   }
   setCurrentItem(item: ElementId) {
     this.currentPlayList = item;
     // console.log('CURRENTELEMENT: ', item);
   }
   delete(item: ElementId) {
    // this.getLists();
     // console.log('id a eliminar: ', item.id);
     this.itemsCollection.doc(item.id.toString()).delete().then(function() {
       console.log('Successfully deleted');
     }).catch(function(error) {
      console.error('Error removing document: ', error);
  });

   }
   insertElementToList(item: ElementId) {
     if ( this.currentPlayList ) {
        // this.currentPlayList.elements.push(item);
        if (this.currentPlayList.elements  === undefined) {
          this.currentPlayList.elements = [];
        }
        this.currentPlayList.elements.push(item);
        this.itemsCollection.doc(this.currentPlayList.id).set(
          { elements: this.currentPlayList.elements },
          { merge: true }
        );
     }
      // console.log('insertElementToList list.component : ', item);
   }
   crearLista () {
     this._router.navigate(['/lists/create']);
   }
   removeItem (item: ElementId) {
    // console.log('new playlistelemnt: ', item);
    this.itemsCollection.doc(item.id).set(
      { elements: item.elements },
      { merge: true }
    );
   }
   getLists() {
    this.elementsId = [];
    const splitted = this._firestoreService.getStringArray(this.CARPETA_FILES);
    splitted.forEach(element => {
       const nuevoElemtoID: ElementId = JSON.parse(element);
       if (!this.elementsId.find(e => e.id === nuevoElemtoID.id)) {
        this.elementsId.push(nuevoElemtoID);
        // console.log('added: ', nuevoElemtoID.id);
       }
    });
    // return JSON.parse(retrievedObject);
  }
  callerTvs() {
    return this.caller === 'tvs' ? true : false;
  }
  callerTvElement() {
    return this.caller === 'tvElement' ? true : false;
  }

  addItemToList (item: ElementId) {
    // console.log('in addItemToList, lists.component ', item);
        this.addItem.emit(item);
    }
}
