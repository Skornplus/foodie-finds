import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http:HttpClient) { }

  search(text:string):Promise<any>{

    let searchText = `?search=${text}`
     return new Promise((resolve, reject) => {
      this.http.get(`http://localhost:3000/search${searchText}`).subscribe(res => {
        console.log(res);
  
        resolve(res);
      })

     })
  }
}
