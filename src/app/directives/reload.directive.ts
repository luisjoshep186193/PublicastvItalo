import { Directive, ElementRef, HostListener, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';

@Directive({
  selector: '[appReload]'
})
export class ReloadDirective {

  constructor(private el: ElementRef,
    private router: Router,
    private _firestoreService: FirestoreService) {
      localStorage.removeItem('tvs');
      _firestoreService.getCollection('tv');
      this.router.navigate(['/tvs']);
    console.log('directiva llamada');
    console.log('playListActive', this.appReload);
    if (this.appReload) {
      console.log('PLAYLIST ACTIVA');
      this.router.navigate(['/tvs']);
    }
  }

  // @Input() appReload: boolean;
  @Input('appReload') appReload = false;

  @HostListener('mouseover') elementChange() {
    console.log('valor playlistactive: ', this.appReload);
    // this.router.navigate(['/lists']);
    // this.el.nativeElement.OnDestroy();
  }

}
