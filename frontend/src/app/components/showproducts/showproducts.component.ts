import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router'
import { LocalStorageService } from 'angular-web-storage';
@Component({
  selector: 'app-showproducts',
  templateUrl: './showproducts.component.html',
  styleUrls: ['./showproducts.component.css']
})
export class ShowproductsComponent implements OnInit {

  userid: any;
  token: any;
  Edit: boolean = false;
  products: any
  productForm = new FormGroup({

    name: new FormControl(''),
    detail: new FormControl(''),
    quantity: new FormControl(''),
    price: new FormControl(''),

  })

  constructor(private ps: ProductsService,private router: Router,private local: LocalStorageService) { this.onLoading() }

  ngOnInit(): void {
  }

  onLoading(){
    
    try {
      this.token = this.local.get('user').token
      this.ps.getProduct2(this.token).subscribe(
        data => {
          this.products = data;
        },err => {
          console.log(err)
          this.router.navigate(['/signin'])
        });
    }catch (error){
      console.log(error)
      this.router.navigate(['/signin'])
    }
  }

  onDelete(productID: String){
    console.log(productID);

    this.ps.deleteProduct(productID)
  }

  editProduct(productID: any){
    console.log(productID);
    //console.log(product);
    console.log(this.productForm.value);
    //this.product = productForm.id
    this.ps.updateProduct(productID,this.productForm.value).subscribe(
      data => {
        console.log(data);
        alert('Product updated successfully')
        this.productForm.reset()
      },
      err =>{
        console.log(err);
      })
  }
  onClick(){
    this.Edit = !this.Edit

  }
  toEdit(){
    //this.router.navigate(['/editproduct'])
  }

}
