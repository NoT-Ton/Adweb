import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray} from '@angular/forms'
import { ProductsService } from 'src/app/services/products.service';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {

  products:any;
  token:any;

  productForm = new FormGroup({
    id: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required]),
    detail: new FormControl('',[Validators.required]),
    quantity: new FormControl('',[Validators.required]),
    price: new FormControl('',[Validators.required]),
  });

  constructor(public local: LocalStorageService, private ps: ProductsService) {
    this.onLoading();
   }

   get name() {return this.productForm.get('name') as FormArray;}
   get detail() {return this.productForm.get('detail') as FormArray;}
   get quantity() {return this.productForm.get('quantity') as FormArray;}
   get price() {return this.productForm.get('price') as FormArray;}
  
   ngOnInit(): void {
  }
  
  onLoading(){
    try {
      this.token = this.local.get('user').token
      this.ps.getProduct(this.token).subscribe(
        data => {
          this.products = data;
        },err => {
          console.log(err)
        });
    }catch (error){
      console.log(error)
    }
  }

  deleteProduct(id : any){
    try {
      this.token = this.local.get('user').token
      this.ps.delProduct(this.token,id).subscribe(
        data => {
          this.products = data;
        },err => {
          console.log(err)
        });
    }catch (error){
      console.log(error)
    }
    window.location.reload();
  }

  updateProducts(){
    this.productForm.get('id')?.setValue(this.products[0].id)
    this.productForm.get('name')?.setValue(this.products[0].name)
    this.productForm.get('detail')?.setValue(this.products[0].detail)
    this.productForm.get('quantity')?.setValue(this.products[0].quantity)
    this.productForm.get('price')?.setValue(this.products[0].price)

    console.log(this.productForm.value)
  }

  updateProduct(){
    console.log(this.productForm.value)
    try {
      this.token = this.local.get('user').token
      this.ps.updateProduct(this.token,this.productForm.value).subscribe(
        data => {
         
        },err => {
          console.log(err)
        });
    }catch (error){
      console.log(error)
    }
    window.location.reload();
  }


}
