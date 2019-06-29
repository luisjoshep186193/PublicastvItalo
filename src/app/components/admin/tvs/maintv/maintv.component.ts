import { Component, OnInit } from '@angular/core';
import { Elemento, ElementId } from '../../../../interfaces/element.interface';
import { FirestoreService } from '../../../../services/firestore.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maintv',
  templateUrl: './maintv.component.html',
  styleUrls: ['./maintv.component.css']
})
export class MaintvComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<ElementId>;
  items: Observable<ElementId[]>;
  public CARPETA_FILES = 'tvs';
  public currentTv: ElementId;
  public elementsId: ElementId [] = [];
  private duration = 1000;
  public activePlaylist = false;
  private initIndex = 0;
  private initIndex2 = 0;

  constructor(private _router: Router,
    public _firestoreService: FirestoreService,
    private afs: AngularFirestore) {
      this.items = _firestoreService.getCollection(this.CARPETA_FILES);
      console.log('at maintv component constructor: ');
    }

  ngOnInit() {
  }

}
