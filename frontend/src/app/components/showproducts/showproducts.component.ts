import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router'
@Component({
  selector: 'app-showproducts',
  templateUrl: './showproducts.component.html',
  styleUrls: ['./showproducts.component.css']
})
export class ShowproductsComponent implements OnInit {

  Edit: boolean = false;
  products: any
  productForm = new FormGroup({
    name: new FormControl(''),
    detail: new FormControl(''),
    quantity: new FormControl(''),
    price: new FormControl(''),

  })

  constructor(private ps: ProductsService) { this.onLoading() }

  ngOnInit(): void {
  }

  onLoading(){
    try {
      this.ps.getProduct().subscribe(
        data => {
          this.products = data
        },
        err =>{
          console.log(err);
        })

    }catch(error){
      console.log(error)
    }

  }

  onDelete(productID: String){
    console.log(productID);

    this.ps.deleteProduct(productID)
  }

  onUpdate(){
    //console.log(productID);
    this.Edit = !this.Edit
   
  }
}
