import { Component, OnInit } from '@angular/core';
import { AppService } from '../servicse/app.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  data:any = [];
  dataCategory:any = [];
  constructor(private app:AppService) { }

  ngOnInit(): void {
    this.app.listCategory().subscribe( (res:any) => {
      this.dataCategory = res.result;
      console.log(this.dataCategory); 
    });
    this.app.listProducts().subscribe( (res:any) => {
      this.data = res.result;
      console.log(this.data); 
    });
  }

}
