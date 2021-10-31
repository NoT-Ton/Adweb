import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  authForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    gender: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }
  back2signin(){
    this.router.navigate(['/signin'])
  }
  signup(){
    this.auth.signUp(this.authForm.value).subscribe(
      data => {
        console.log(this.authForm.value);
        if(data.status == true){
          this.router.navigate(['/signup']);
        }else{
          alert('signup successful!')

          //navigate to products but go to signin
          this.router.navigate(['/products']);
        }
      },err => {
        console.log(err)
        alert('signup is incorrect! in signup')
      })

  }
}
