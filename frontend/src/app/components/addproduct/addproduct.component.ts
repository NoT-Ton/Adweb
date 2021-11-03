import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray} from '@angular/forms'
import { LocalStorageService } from 'angular-web-storage';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  productType: String[] = ['CPU','RAM', 'HDD','Mainboard']

  productForm = new FormGroup({
    type: new FormControl('',[Validators.required]),
    id: new FormControl('',[Validators.required]),
    name: new FormControl('',[Validators.required]),
    detail: new FormControl('',[Validators.required]),
    quantity: new FormControl('',[Validators.required]),
    price: new FormControl('',[Validators.required]),
    file: new FormControl('',[Validators.required]),
    img: new FormControl('',[Validators.required]),
  })

  previewLoaded: boolean = false

  get name() {return this.productForm.get('name') as FormArray;}
  get detail() {return this.productForm.get('detail') as FormArray;}
  get quantity() {return this.productForm.get('quantity') as FormArray;}
  get price() {return this.productForm.get('price') as FormArray;}

  constructor(private local: LocalStorageService, private ps: ProductsService) { }
  token: any

  ngOnInit(): void {
  }

  addProduct(){
    this.token = this.local.get('user').token
    this.ps.addProduct(this.productForm.value,this.token).subscribe(
      data => {
        console.log(data)
        alert('Product added successfully');
        this.productForm.reset();
      },
      err => {
        console.log(err);
      }
    );
    window.location.reload();
  }

  onChangeImg(e : any){
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.previewLoaded = true;
          this.productForm.patchValue({
            img: reader.result
          })
      }
    }
  }

  resetForm(){
    this.productForm.reset()
    this.previewLoaded = false
  }
}
