import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ElementModel } from '../models/element.model';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { FileModel } from '../models/file.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ElementsService {

  private url = 'https://publicastv-a67df.firebaseio.com/';
  private CARPETA_FILES = 'file';
  private storageRef = firebase.storage().ref();
  constructor(private http: HttpClient,
              private db: AngularFirestore,
              private _router: Router) {

  }

  cargarImagenesFirebase( imagenes: FileModel[]) {



    for (const item of imagenes) {

      item.estaSubiendo = true;
      if ( item.progreso >= 100) {
        continue;
      }

      const uploadTask: firebase.storage.UploadTask =
                     this.storageRef.child(`${ this.CARPETA_FILES } /${ item.nombreArchivo}`)
                     .put( item.archivo);

                     uploadTask.on ( firebase.storage.TaskEvent.STATE_CHANGED,
                      ( snapshot ) => item.progreso = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100,
                      ( error ) => console.log('Error al subir', error),
                      () => {
                        console.log('Imagen cargada correctamente');
                         uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
                          // update firebase database
                          item.url =  downloadUrl ;
                          item.estaSubiendo = false;
                          this.guardarFile ({
                            name: item.nombreArchivo,
                            url: item.url,
                            duration: item.duration
                          }, imagenes);

                          });
                      });

    }
  }

private guardarFile(file: {name: string, url: string, duration: number}, imagenes: FileModel[]) {
  let lastFile = true;
  this.db.collection(`/${this.CARPETA_FILES}`).add(file);
  for (const item of imagenes) {
    if ( item.progreso !== 100 ) {
      lastFile = false;
    }
  }
  if (lastFile) {
    this._router.navigate(['./elements']);
  }
  // this._router.navigate(['./elements']);
}

deleteFile(collectionName: string, fileName: string) {
  this.storageRef.child(`${ collectionName } /${ fileName}`).delete().then(function() {
   console.log('File Successfully deleted');
    // File deleted successfully
  }).catch(function(error) {
    console.log('File UNSuccessfully deleted');
    // Uh-oh, an error occurred!
  });
}
}
