import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ElementId } from 'src/app/interfaces/element.interface';

@Component({
  selector: 'app-element-card',
  templateUrl: './element-card.component.html',
  styleUrls: ['./element-card.component.css']
})
export class ElementCardComponent implements OnInit {

  @Input() item: ElementId;
  @Output() deleteItem: EventEmitter<ElementId>;

  constructor() {
    this.deleteItem = new EventEmitter();
   }

  ngOnInit() {
  }

  delete () {
    this.deleteItem.emit(this.item);
    /*
    console.log( 'deleting', name);
    this.itemsCollection.doc(idx.toString()).delete().then(function() {
      console.log('collection Successfully deleted');
    }).catch(function(error) {
     console.error('Error removing document: ', error);
 });
 this.elementService.deleteFile(this.CARPETA_FILES, name);
 */
  }

}
