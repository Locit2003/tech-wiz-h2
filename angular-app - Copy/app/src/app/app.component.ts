import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  account:any;

  constructor() { }

  ngOnInit(): void {
    let storage = sessionStorage.getItem('login');
    if(storage){
      this.account = JSON.parse(storage)
    }
  }
  logout(){
    sessionStorage.clear();
    location.assign('/')
  }

}
