/**
 * Created by makarandpuranik on 2/23/17.
 */

import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ItemService{
  constructor(private http:Http){
    console.log("Item Service Initialized...");
  }

  getItems(){
    return this.http.get('http://localhost:3000/api/items').map(res => res.json());
  }

  addItem(newItem){
    var headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('http://localhost:3000/api/item', JSON.stringify(newItem), {headers: headers})
      .map(res => res.json() );
  }

  updateItem(updateItem){
    var headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put('http://localhost:3000/api/item'+updateItem._id, JSON.stringify(updateItem), {headers: headers})
      .map(res => res.json() );
  }

  deleteItem(id){
    return this.http.delete('http://localhost:3000/api/item/'+id)
      .map(res => res.json());
  }
}
