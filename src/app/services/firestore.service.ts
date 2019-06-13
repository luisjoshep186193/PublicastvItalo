import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ElementModel } from '../models/element.model';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { FileModel } from '../models/file.model';
import { Observable } from 'rxjs';
import { ElementId } from '../interfaces/element.interface';
@Injectable({
    providedIn: 'root'
  })
  export class FirestoreService {
    private itemsCollection: AngularFirestoreCollection<ElementId>;
    items: Observable<ElementId[]>;
    private url = 'https://publicastv-a67df.firebaseio.com/';
    private CARPETA_FILES = 'file';
    private newElements: ElementId[] = [];
    public elementsId: ElementId [] = [];
    private elementsString = '';

    constructor(private http: HttpClient,
                private db: AngularFirestore) {

    }

  public getCollection (nameCollection: string) {
    this.itemsCollection = null;
    this.items = null;
    this.itemsCollection = this.db.collection<ElementId>(nameCollection);
    this.elementsString = '';
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        this.elementsId.push({ id, ...data });
        this.elementsString += JSON.stringify({ id, ...data }) + '.,';
        localStorage.setItem(nameCollection, JSON.stringify(this.elementsString));
        return { id, ...data };
      }))
      );
      console.log('getting collection: ', nameCollection);
      console.log('elements: ', this.items);
      return this.items;
  }

  public getStringArray (elementType: string) {
    let retrievedObject = localStorage.getItem(elementType);
    retrievedObject = retrievedObject.substring(0, retrievedObject.length - 3) + '"';
    const cadena = JSON.parse(retrievedObject);
    return cadena.split('.,');
  }
  public guardarFile(file: any, ruta: string) {

    this.db.collection(`/${ruta}`).add(file);
    this.getCollection(file);
  }

  getLists(collectionName: string) {
    this.newElements = undefined;
    this.newElements = [];
    this.elementsId = this.elementsId.splice(0, this.elementsId.length);
    const splitted = this.getStringArray(collectionName);
    console.log('elementIds before: ', this.elementsId);
    splitted.forEach(element => {
       const nuevoElemtoID: ElementId = JSON.parse(element);
       if (!this.newElements.find(e => e.id === nuevoElemtoID.id)) {
        this.newElements.push(nuevoElemtoID);
        console.log('added: ', nuevoElemtoID.id);
       }
    });
    console.log('elementIds: ', this.elementsId);
     return this.newElements;
  }
  }
