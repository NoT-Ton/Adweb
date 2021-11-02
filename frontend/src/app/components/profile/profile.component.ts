import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  ColorProperty!: string;

  constructor() { }

  ngOnInit(): void {
  }

  receiveData($event:any){
    this.ColorProperty = $event
  }
  

}
