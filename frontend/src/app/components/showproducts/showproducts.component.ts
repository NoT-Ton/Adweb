import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { FormControl, FormGroup, FormArray} from '@angular/forms';
import { LocalStorageService } from 'angular-web-storage';
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

  constructor(private ps: ProductsService, private local: LocalStorageService) { }

  ngOnInit(): void {
  }

}
