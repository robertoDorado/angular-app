import { Component, AfterViewInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements AfterViewInit {

  constructor(
    public dialogRef: MatDialogRef<ProductDeleteComponent>,
    private productService: ProductService
  ) { }

  ngAfterViewInit(): void {
  }

  deleteProduct(): void {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    this.productService.readById(id).subscribe((product) => {
      this.productService.delete(product).subscribe(() => {
        document.querySelectorAll('tr').forEach((element) => {
          if (id) {
            const idDelete = element.getAttribute("id")
            if (idDelete == id) {
              element.style.display = "none"
            }
          }
        })
        this.productService.showMessage("produto deletado com sucesso!")
      })
    })
  }
}
