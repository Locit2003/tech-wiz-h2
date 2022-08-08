import { Component, OnInit } from '@angular/core';
import { AppService } from '../servicse/app.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  data:any = [];
  cats:any = [];

  constructor(private app:AppService) {}

  ngOnInit(): void {
    this.app.listProducts().subscribe((res:any) =>{
      this.data = res.result;
      console.log(this.data)
    });
    this.app.listCategory().subscribe((res:any) =>{
      this.cats = res.result;
    });
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 2
      },
      760: {
        items: 3
      },
      1000: {
        items: 4
      }
    },
    nav: true
  }

}
