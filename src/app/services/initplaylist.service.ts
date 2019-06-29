import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InitplaylistService {
  play: boolean;
  constructor() { this.play = true;
  }
  hide() { this.play = false; }

  show() { this.play = true; }

  toggle() { this.play = !this.play; }
}
