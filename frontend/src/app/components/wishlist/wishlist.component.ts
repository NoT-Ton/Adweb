import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router'

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  products: any

  constructor(private ps: ProductsService,private router: Router) { }

  ngOnInit(): void {
  }

  onDelete(productID: String){
    console.log(productID);

    this.ps.deleteProduct(productID)
  }
}
