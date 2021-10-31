import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map } from 'rxjs/operators'
import { Product } from '../product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products:any

  constructor(private http: HttpClient) { }

  addProduct(product: any){
    return this.http.post<any>('http://localhost:3000/api/add', product)
    .pipe(map(data => {
      return data
    }))
  }

  getProduct(){
    return this.http.get<any>('http://localhost:3000/api/products/get')
    .pipe(map(data => {
      if(data){
        this.products = data
        console.log(this.products);
      }
      return this.products
    }))
  }

  updateProduct(_id: String,name: String, detail: String, quantity: Number,price: Number){
    const product: Product = {_id: _id,name: name, detail: detail, quantity: quantity, price: price}
    return this.http.put<any>('http://localhost:3000/api/products/update/' + _id,product)
    .subscribe(() => {
      console.log('updated');

    })
  }

  deleteProduct(productID: String){
    return this.http.delete('http://localhost:3000/api/product/delete/' +productID)
    .subscribe(() => {
      console.log('deleted');

    })
  }
}
