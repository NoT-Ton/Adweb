import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  userid: any
  token: any
  products: any

  constructor(private local: LocalStorageService,private ps: ProductsService, public router: Router) {
    this.onLoading();
   }

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

}
