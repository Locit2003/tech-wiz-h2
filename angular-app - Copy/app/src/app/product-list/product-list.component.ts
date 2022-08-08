import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../servicse/app.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  id:any;
  cat:any;
  product:any = [];
  cats: any = [];

  constructor(private app:AppService ,private activedRoter: ActivatedRoute) { }

  ngOnInit(): void {
      this.app.listCategory().subscribe((res:any) => {
        this.cats = res.result;
      });
      this.app.listProducts().subscribe((res:any) => {
        this.product = res.result;
      });
      this.activedRoter.paramMap.subscribe((query:any)=>{
          this.id = query.get('id');
          this.app.listProductsCategories(this.id).subscribe((res:any) => {
            this.product = res.result;
          });
          this.app.listCategoryID(this.id).subscribe((res:any)=>{
            this.cat = res.result;
          })
      });
  }

}
