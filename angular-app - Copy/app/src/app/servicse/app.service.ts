import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const api = 'http://localhost:8888/api'
@Injectable({
  providedIn: 'root'
})
export class AppService {
  // dependency inection
  constructor(private http:HttpClient) { }

  listCategory() {
    return this.http.get(`${api}/Category`);
  }
  listProducts() {
    return this.http.get(`${api}/product`);
  }
  listProductsCategories(id:number) {
    return this.http.get(`${api}/category-list-product/${id}`);
  }
  listCategoryID(id:number) {
    return this.http.get(`${api}/category/${id}`);
  }
  productsDetails(id:number) :any {
    return this.http.get<any>(`${api}/product/${id}`);
  }
  checkLogin(data:any):any{
    return this.http.post<any>(`${api}/login`,data);
  }
  register(data:any):any {
    return this.http.post<any>(`${api}/register`,data);
  }
}
