import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products:any

  constructor(private http: HttpClient) { }

  addProduct(product: any, token: any){
    const headers = {'Authorization': token}
    return this.http.post<any>('http://localhost:3000/api/add', product, {headers})
    .pipe(map(data => {
      return data
    }))
  }

  getProduct(token:any){
    const headers = {'Authorization': token}
    return this.http.get<any>('http://localhost:3000/api/products/get',{headers})
    .pipe(map(data => {
      if(data){
        this.products = data
        console.log(this.products);
      }
      return this.products
    }))
  }

  delProduct(token: any,id :any){
    console.log(id)
    const headers = {'Authorization': token}
    return this.http.delete<any>('http://localhost:3000/api/products/delete/'+id,{headers})
  }

  getSomeProducts(id:number){
    return this.products[id]
  }

  deleteProductID(token: any,customerid:any,productID :any){
    console.log(productID)
    console.log(customerid)
    const headers = {'Authorization': token}
    return this.http.delete<any>('http://localhost:3000/carts/deletefromcart/'+customerid+'/'+productID,{headers})
  }

  updateProduct(productID: String,product: any){
    console.log(product);

    return this.http.put<any>('http://localhost:3000/api/products/update/'+productID, product)
    .pipe(map(data => {
      return data
    }))
  }
}
