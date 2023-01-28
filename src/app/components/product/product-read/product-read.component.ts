import { Component, AfterViewInit, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductDeleteComponent } from '../product-delete/product-delete.component';
import { Product, ProductTemplate } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements AfterViewInit {

  products!: Product[]

  productTemplate!: ProductTemplate[]

  displayedColumns: string[] = ['id', 'name', 'price', 'action']

  constructor(private productService: ProductService, public dialog: MatDialog) {
  }

  ngAfterViewInit(): void {
    this.productService.read().subscribe(products => {
      this.productTemplate = products.map(product => {
        let priceFormated = product.price?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        return { id: product.id, name: product.name, price: priceFormated }
      })
    })
  }

  getProduct(product: Product) {
    const conteudo = document.getElementById("conteudo-arquivo")
    if (conteudo) {
      conteudo.innerHTML = `o registro ${product.name} de ${product.price} reais
      está prestes a ser deletado gostaria de continuar?`

      let url = window.location.href
      window.history.replaceState('url', url, `${url}?id=${product.id}`)

      if (url.match(/\?id=\d+/)) {
        url = url.replace(/\?id=\d+/, "")
        window.history.replaceState('url', url, `${url}?id=${product.id}`)
      }
    }
  }


  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ProductDeleteComponent, {
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration
    })
  }
}
