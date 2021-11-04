import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CartService {
//hi
  counter: Number=0;
  sumPrice: Number=0;
  cart: ProductsService|any = []

  constructor(private pe: ProductsService, private http: HttpClient) { }

  getcart(userid: any,token: any){
    const headers = {'Authorization':token}
   return this.http.get<any>('http://localhost:3000/carts/getcart/'+userid,{headers})
   .pipe(map(data => {
     if (data) {
       this.cart = data
       this.counter = data.length

     }
     return this.cart;
   }));
 }

 add(id: number){
  console.log('Add device idt: '+id+' to cart');
  this.cart.push(this.pe.getSomeProducts(id))
  this.sumPrice += this.pe.getSomeProducts(id).price;
  this.counter = this.cart.length
  }

  getCounter(){
    return this.counter;
  }

  getCarts(){
    return this.cart;
  }

  updatecart(token: any, product: any, quantity: any){
    const headers = {'Authorization': token}
    return this.http.put<any>('http://localhost:3000/carts/updatecart/'+quantity,product,{headers})
    .pipe(map(data => {
      if (data) {
     
        console.log(data);
      }
      
    }));
  }
  deletecart(token: any, customerid: any){
    const headers = {'Authorization': token}
    return this.http.delete<any>('http://localhost:3000/carts/deleteallcart/'+customerid,{headers})
    .pipe(map(data => {
      if (data) {
     
        console.log(data);
      }
      
    }));
  }
}
