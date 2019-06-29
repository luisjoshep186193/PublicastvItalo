import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Elemento, ElementId } from '../../../../interfaces/element.interface';
import { FirestoreService } from '../../../../services/firestore.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { NavbarService } from '../../../../services/navbar.service';
import { InitplaylistService } from 'src/app/services/initplaylist.service';
import { element } from 'protractor';
// tslint:disable-next-line: no-unused-expression

@Component({
  selector: 'app-mytv',
  templateUrl: './mytv.component.html',
  styleUrls: ['./mytv.component.css']
})
export class MytvComponent implements OnInit, OnDestroy {
  private itemsCollection: AngularFirestoreCollection<ElementId>;
  items: Observable<ElementId[]>;

  private globalElement = [] as ElementId[];
  public CARPETA_FILES = 'tvs';
  public currentTv: ElementId;
  public elementsId: ElementId [] = [];
  private duration = 1000;
  private skeep = 0;
  public activePlaylist;
  private initIndex = 0;
  private initIndex2 = 0;
  @Input() item: ElementId;
  @Input() activeURL = 'assets/itnovacast.png';
  @Input() activeURL2 = 'assets/itnovacast.png';

  constructor(private _router: Router,
    public _firestoreService: FirestoreService,
    private afs: AngularFirestore,
    public nav: NavbarService,
    public play: InitplaylistService) {
      this.getcollection();
      // this.itemsCollection = afs.collection<ElementId>(this.CARPETA_FILES);
      // this.items = _firestoreService.getCollection(this.CARPETA_FILES);
      // console.log('tvs:', this.items);
      // console.log(localStorage.getItem(this.CARPETA_FILES));
      console.log('at mytv component constructor: ');
    }
    getcollection() {
      localStorage.removeItem('tvs');
      this.activePlaylist = this.play.play;
      this.items = this._firestoreService.getCollection(this.CARPETA_FILES);
    }
    ngOnDestroy(): void {
      this.nav.show();
      this.stopPlaylist();
    }

  ngOnInit() {
    console.log('at mytv nginit: ');
    this.nav.hide();
    this.play.show();
    this.activePlaylist = true;
    this.delayStart(3000);

     // this.initPlaylist();
  }
  stopPlaylist() {
    console.log('on stop');
    this.play.hide();
  }
  initPlaylist() {
    this.elementsId = this._firestoreService.getLists(this.CARPETA_FILES);
    console.log(this.elementsId);

    for (const tv of this.elementsId) {
      console.log(tv);
   // for (const playlist of tv.elements) {
    for (let i = 0 ; i < tv.elements.length ; i ++) {
      console.log(tv.elements[i]);

      if (tv.elements[i].elements && tv.elements[i].elements.length > 0) {
       // this.duration += this.duration;
        console.log('elements lenght: ', tv.elements[i].elements);
        // this.activePlaylist = true;
        this.delay(1000, tv.elements[i].elements, this.initIndex, i).then(any => {
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

// tslint:disable-next-line: no-shadowed-variable
  async delay(ms: number, element?: ElementId[], index?: number, playlistIndex?: number) {
   // element = this._firestoreService.elementsId[0].elements[playlistIndex].elements;
    this.globalElement = element;
    if (element !== undefined && element !== null) {

    if (element.length > 0 && this.skeep === 0) {
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
         console.log('fired playlist: ', playlistIndex + ' ' + element[index].name);
         if (this.play.play && this.returnelement().length > 0) {
           console.log('active playlist ', this.play.play);
           this.duration = element[index].duration * 1000;
           console.log('dur ' + this.duration, 'el ' + element, playlistIndex === 0 ? this.initIndex : this.initIndex2, playlistIndex);
           this.delay(this.skeep === 0 ? this.duration : this.skeep,
            element, playlistIndex === 0 ? this.initIndex : this.initIndex2, playlistIndex).then(any => {
           this.skeep = 0;
            });

         } else {
          localStorage.removeItem('tvs');
           this.play.hide();
           this.activeURL = 'assets/loading.jpg';
           this.getcollection();
          this.delayStart(1000);
          /*
          this._firestoreService.getCollection(this.CARPETA_FILES);
          element = this.returnelement();
          if (element !== null ) {
            this.play.show();
            console.log('in else delay not null element ', element);
            this.delay(10000, element, 0, 0);
            } else {
              console.log('null element ', element);
              this.delay(10000);
            }*/

         }
       });
    }
    }
}
skeepFunc() {
  this.skeep = 500;
}
continueFunc() {
  this.skeep = 0;
  this.delay(500, this.globalElement, this.initIndex, 0);
}
returnelement() {
  // regresa la tv 1
  /*if ( this._firestoreService.elementsId[0] ) {
    // regresa la playlist 1
    if ( this._firestoreService.elementsId[0].elements[0] ) {
        if ( this._firestoreService.elementsId[0].elements[0].elements &&
          this._firestoreService.elementsId[0].elements[0].elements.length > 0 ) {
           return this._firestoreService.elementsId[0].elements[0].elements;
        }
    }
  }*/
  return this._firestoreService.getLists(this.CARPETA_FILES);
}
async delayStart(ms: number) {
 // this.itemsCollection = this.afs.collection<ElementId>(this.CARPETA_FILES);
 this.elementsId = null;
  console.log('at delaystart 10 seg: ');
  if (this.activePlaylist) {
  await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => {
    this.elementsId = this._firestoreService.getLists(this.CARPETA_FILES);
    console.log('elementos this.elementsId: ', this.elementsId);
    if (this.elementsId[0])  {
      console.log('playlist asinada: ', this.elementsId[0].title);
      if (this.elementsId[0].elements.length > 0) { // lista de rep asig
        console.log('elementos asignados', this.elementsId[0].elements.length);
        this.play.show();
        this.initPlaylist();
      } else { // no elementos en lista de rep asig
        console.log('playlist asignada sin elementos');
        localStorage.removeItem('tvs');
        this.getcollection();
        this.play.show();
        this.delayStart(10000);
      }
    } else {
      console.log('no playlist asignada');
      localStorage.removeItem('tvs');
      this.getcollection();
      this.play.hide();
        this.delayStart(10000);
    }

  });
}
}
}
