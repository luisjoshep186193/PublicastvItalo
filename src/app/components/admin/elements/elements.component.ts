import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ElementId } from 'src/app/interfaces/element.interface';
import { ElementsService } from 'src/app/services/elements.service';


export interface Item {id: string; duration: number; nombre: string; url: string; }

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.css']
})
export class ElementsComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<ElementId>;
  items: Observable<ElementId[]>;
  private CARPETA_FILES = 'file';
  @Input() caller: string;
  @Input() item: ElementId;
  @Output() addItem: EventEmitter<ElementId>;

  constructor(private afs: AngularFirestore,
    private _firestoreService: FirestoreService,
    private elementService: ElementsService ) {
      this.addItem = new EventEmitter<ElementId>();
       this.caller = '';

    this.itemsCollection = afs.collection<ElementId>(this.CARPETA_FILES);
    this.items = _firestoreService.getCollection(this.CARPETA_FILES);
  }

  ngOnInit() {
   // console.log('caller value: ', this.caller);
  }

  delete (item: ElementId) {
   // console.log( 'deleting', name);
    this.itemsCollection.doc(item.id.toString()).delete().then(function() {
      console.log('collection Successfully deleted');
    }).catch(function(error) {
     console.error('Error removing document: ', error);
 });
 this.elementService.deleteFile(this.CARPETA_FILES, item.name);
  }

  addItemToList (item: ElementId) {
  // console.log('in addItemToList, elements.component ', item);
      this.addItem.emit(item);
  }

  callerLists() {
    return this.caller === 'lists' ? true : false;
  }

}
