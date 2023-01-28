import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from "@angular/material/snack-bar"
import { Observable } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  urlBase: string = "http://localhost:8080/api/products/json";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {
  }
  
  showMessage(msg: string) {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }
  
  read() : Observable<Product[]> {
    const urlBase = this.urlBase.replace("/json", "")
    return this.http.get<Product[]>(urlBase)
  }
  
  create(product: Product) : Observable<Product> {
    return this.http.post<Product>(this.urlBase, product)
  }

  readById(id: string | null) : Observable<Product> {
    let urlBase = this.urlBase.replace("/json", "")
    urlBase = `${urlBase}/${id}`
    return this.http.get<Product>(urlBase)
  }

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(this.urlBase, product)
  }

  delete(product: Product): Observable<Product> {
    return this.http.delete<Product>(this.urlBase, { body: product })
  }
}
