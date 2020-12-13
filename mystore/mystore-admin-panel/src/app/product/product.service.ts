import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private url = 'http://localhost:4000/product'

  constructor(private http: HttpClient) { }

  getProducts() {

    // send the token along with the request
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }

    return this.http.get(this.url, httpOptions)
  }

  addProduct(title: string, description: string, price: string, category: number, brand: number, image: any) {
    // use formdata to collect the value with a file as one of the parameters
    const body = new FormData()
    body.append("title", title)
    body.append("description", description)
    body.append("price", price)
    body.append("categoryId", '' + category)
    body.append("brandId", '' + brand)
    body.append("photo", image)
    
    // send the token along with the request
    const httpOptions = {
      headers: new HttpHeaders({
        token: sessionStorage['token']
      })
    }

    return this.http.post(this.url, body, httpOptions)
  }
}