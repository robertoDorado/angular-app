import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = {
    name: '',
    price: null!
  }

  constructor(private productService: ProductService, private router: Router) {
  }
  
  ngOnInit(): void {}

  saveProduct(): void {
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage("Salvando...")
      this.router.navigate(["/produtos"])
    })
  }

  cancel (): void {
    this.router.navigate(["/produtos"])
  }
}
