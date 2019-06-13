import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Elemento, ElementId } from '../../../../interfaces/element.interface';
import { FirestoreService } from '../../../../services/firestore.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { NavbarService } from '../../../../services/navbar.service';
// tslint:disable-next-line: no-unused-expression

@Component({
  selector: 'app-mytv',
  templateUrl: './mytv.component.html',
  styleUrls: ['./mytv.component.css']
})
export class MytvComponent implements OnInit, OnDestroy {
  private itemsCollection: AngularFirestoreCollection<ElementId>;
  items: Observable<ElementId[]>;

  public CARPETA_FILES = 'tvs';
  public currentTv: ElementId;
  public elementsId: ElementId [] = [];
  private duration = 1000;
  public activePlaylist = false;
  private initIndex = 0;
  private initIndex2 = 0;
  @Input() item: ElementId;
  @Input() activeURL = 'assets/publicast.png';
  @Input() activeURL2 = 'assets/tv.png';

  constructor(private _router: Router,
    public _firestoreService: FirestoreService,
    private afs: AngularFirestore,
    public nav: NavbarService) {
      this.items = _firestoreService.getCollection(this.CARPETA_FILES);
      // this.itemsCollection = afs.collection<ElementId>(this.CARPETA_FILES);
      // this.items = _firestoreService.getCollection(this.CARPETA_FILES);
      // console.log('tvs:', this.items);
      // console.log(localStorage.getItem(this.CARPETA_FILES));
      console.log('at mytv component constructor: ');
    }
    ngOnDestroy(): void {
      this.nav.show();
      this.stopPlaylist();
    }

  ngOnInit() {
    console.log('at mytv nginit: ');
    this.nav.hide();
    this.activePlaylist = true;
    this.delayStart(3000);

     // this.initPlaylist();
  }
  stopPlaylist() {
    this.activePlaylist = false;
  }
  initPlaylist() {
    // this.elementsId = this._firestoreService.getLists(this.CARPETA_FILES);
    console.log(this.elementsId);

    for (const tv of this._firestoreService.elementsId) {
      console.log(tv);
   // for (const playlist of tv.elements) {
    for (let i = 0 ; i < tv.elements.length ; i ++) {
      console.log(tv.elements[i]);

      if (tv.elements[i].elements && tv.elements[i].elements.length > 0) {
        this.duration += this.duration;
        console.log('elements lenght: ', tv.elements[i].elements);
        // this.activePlaylist = true;
        this.delay(this.duration, tv.elements[i].elements, this.initIndex, i).then(any => {
          console.log('after');
     });
      }
    }

    }
    /*this.delay(3000).then(any => {
      console.log('after delay');
      this.activeURL = 'assets/tv.png';
 });*/
  }

  async delay(ms: number, element: ElementId[], index: number, playlistIndex: number) {
    if (this._firestoreService.elementsId[0].elements[playlistIndex].elements !== undefined) {
element = this._firestoreService.elementsId[0].elements[playlistIndex].elements;
    if (element.length > 0) {
      await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => {
        switch (playlistIndex) {
          case 0:
             this.activeURL = element[index].url;
             if (index < element.length - 1) {
               this.initIndex++;
             } else {
               this.initIndex = 0;
               // this.activePlaylist = false;
             }
            break;
            case 1:
               this.activeURL2 = element[index].url;
               if (index < element.length - 1) {
                 this.initIndex2++;
               } else {
                 this.initIndex2 = 0;
                 // this.activePlaylist = false;
               }
            break;
            default: return;
        }
         console.log('fired playlist: ', playlistIndex);
         if (this.activePlaylist) {
           this.duration = element[index].duration * 1000;
           this.delay(this.duration, element, playlistIndex === 0 ? this.initIndex : this.initIndex2, playlistIndex).then(any => {
           });

         }
       });
    }
    }
}
async delayStart(ms: number) {
 // this.itemsCollection = this.afs.collection<ElementId>(this.CARPETA_FILES);
 // this.elementsId = this._firestoreService.getLists(this.CARPETA_FILES);
 this.elementsId = this._firestoreService.elementsId;
  console.log('at delaystart nginit: ', this.elementsId);
  await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => {
    if (!this.activePlaylist) {
      this.stopPlaylist();
      return;
    }
    if (this.elementsId[0]) {
      console.log('in delaystart this.elementsId[0]', this.elementsId[0]);
      if (this.elementsId[0].elements.length > 0) {
        console.log('in delaystart this.elementsId[0].elements.lenght', this.elementsId[0].elements.length);
        this.initPlaylist();
      }
    }

  });
}
}
