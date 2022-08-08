import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../servicse/app.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  id:any;
  productDetails:any;
  products:any;
  constructor(private app:AppService, private activedRoter: ActivatedRoute) { }

  ngOnInit(): void {
    this.activedRoter.paramMap.subscribe((query:any) => {
        this.id = query.get('id');
        this.app.productsDetails(this.id).subscribe((res:any)=>{
          this.productDetails = res.result;
          console.log(this.productDetails);
          this.app.listProductsCategories(this.productDetails.category_id).subscribe((res:any)=>{
            this.products = res.result;
            console.log(this.products);
          })
        });
    });
  }
}
