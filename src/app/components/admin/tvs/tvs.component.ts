import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Elemento, ElementId } from '../../../interfaces/element.interface';
import { FirestoreService } from '../../../services/firestore.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tvs',
  templateUrl: './tvs.component.html',
  styleUrls: ['./tvs.component.css']
})
export class TvsComponent implements OnInit {

  private itemsCollection: AngularFirestoreCollection<ElementId>;
  items: Observable<ElementId[]>;
  @Input() item: ElementId;

  public CARPETA_FILES = 'tvs';
  modalCaller = 'tvElement';
  public elementsId: ElementId [] = [];
  public currentTv: ElementId;

  constructor(private _router: Router,
    private _firestoreService: FirestoreService,
    private afs: AngularFirestore) {
      this.itemsCollection = afs.collection<any>(this.CARPETA_FILES);
      this.items = _firestoreService.getCollection(this.CARPETA_FILES);
     }

  ngOnInit() {
  }
  insertElementTv (item: ElementId) {
    console.log('current tv: ', this.currentTv);
    console.log('on tv insert: ', item);
    if ( this.currentTv ) {
      // this.currentPlayList.elements.push(item);
      if (this.currentTv.elements  === undefined) {
        this.currentTv.elements = [];
      }
      this.currentTv.elements.push(item);
      this.itemsCollection.doc(this.currentTv.id).set(
        { elements: this.currentTv.elements },
        { merge: true }
      );
   }
  }
  removeItem (item: ElementId) {
    console.log('new tvelemnt: ', item);
    this.itemsCollection.doc(item.id).set(
      { elements: item.elements },
      { merge: true }
    );
   }
  setCurrentItem(item: ElementId) {
    this.currentTv = item;
    // console.log('CURRENTELEMENT: ', item);
  }
}
