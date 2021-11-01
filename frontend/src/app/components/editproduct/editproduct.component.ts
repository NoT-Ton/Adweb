import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  products:any

  productForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    detail: new FormControl('',[Validators.required]),
    quantity: new FormControl('',[Validators.required]),
    price: new FormControl('',[Validators.required]),
  })

  constructor(private ps: ProductsService) { }

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

  editProduct(){
   
  }

  resetForm(){

  }
}
