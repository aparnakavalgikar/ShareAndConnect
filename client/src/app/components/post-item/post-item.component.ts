import { Component } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../item';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent {

  items: Item[];
  title: string;

  constructor(private itemService:ItemService){
    this.itemService.getItems().subscribe( items => {
      this.items = items;
    });
  }

  addItem(event){
    event.preventDefault();

    let newItem = {
      title: this.title,
      isAvailable: false
    };

    this.itemService.addItem(newItem)
      .subscribe(item => {
        this.items.push(item);
        this.title = '';
      });
  }

  updateItem(item){
    let _item = {
      _id: item._id,
      title: item.title,
      isAvailable: !item.isAvailable
    };

    this.itemService.updateItem(_item).subscribe( item => {
      item.isAvailable = !item.isAvailable;
    })
  }

  deleteItem(id){
    let items = this.items;

    this.itemService.deleteItem(id).subscribe(data => {
      if (data.n == 1) {
        for (let i=0; i<items.length; i++){
          if (items[i]._id == id){
            items.splice(i, 1);
          }
        }
      }
    });
  }
}
