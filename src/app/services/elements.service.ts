import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ElementModel } from '../models/element.model';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { FileModel } from '../models/file.model';

@Injectable({
  providedIn: 'root'
})
export class ElementsService {

  private url = 'https://publicastv-a67df.firebaseio.com/';
  private CARPETA_FILES = 'file';

  constructor(private http: HttpClient,
              private db: AngularFirestore) {

  }

  cargarImagenesFirebase( imagenes: FileModel[]) {

    const storageRef = firebase.storage().ref();

    for (const item of imagenes) {

      item.estaSubiendo = true;
      if ( item.progreso >= 100) {
        continue;
      }

      const uploadTask: firebase.storage.UploadTask =
                     storageRef.child(`${ this.CARPETA_FILES } /${ item.nombreArchivo}`)
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
                            nombre: item.nombreArchivo,
                            url: item.url
                          });

                          });
                      });

    }
  }

private guardarFile(file: {nombre: string, url: string}) {

  this.db.collection(`/${this.CARPETA_FILES}`).add(file);
}

  crearElement(element: ElementModel) {
    return this.http.post(`${this.url}/elements.json`, element)
    .pipe(
      map((resp: any) => {
        element.id = resp.name;
        return element;
      })
    );
  }
  actualizarElement(element: ElementModel) {
    const elementTemp = {
      ...element
    };

    delete elementTemp.id;

    return this.http.put(`${ this.url }/elements/${element.id}.json`, elementTemp);


}
}
