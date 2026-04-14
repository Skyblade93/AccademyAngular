import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../Service/product.service';
import { Product } from '../Dto/product';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class ProductComponent implements OnInit {
  products: Product[] = [];

  productForm: Product = {
    id: 0,
    name: '',
    price: 0,
    quantity: 0,
    category: ''
  };

  isEditMode = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data: any) => {
        this.products = data;
      },
      error: (err: any) => {
        console.error('Errore nel recupero prodotti:', err);
      }
    });
  }

  saveProduct(): void {
    if (this.isEditMode) {
      this.productService.updateProduct(this.productForm.id!, this.productForm).subscribe({
        next: () => {
          this.resetForm();
          this.getProducts();
        },
        error: (err: any) => {
          console.error('Errore modifica prodotto:', err);
        }
      });
    } else {
      const newProduct: Product = {
        name: this.productForm.name,
        price: this.productForm.price,
        quantity: this.productForm.quantity,
        category: this.productForm.category
      };

      this.productService.createProduct(newProduct).subscribe({
        next: () => {
          this.resetForm();
          this.getProducts();
        },
        error: (err: any) => {
          console.error('Errore creazione prodotto:', err);
        }
      });
    }
  }

  editProduct(product: Product): void {
    this.productForm = { ...product };
    this.isEditMode = true;
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.getProducts();
      },
      error: (err: any) => {
        console.error('Errore eliminazione prodotto:', err);
      }
    });
  }

  resetForm(): void {
    this.productForm = {
      id: 0,
      name: '',
      price: 0,
      quantity: 0,
      category: ''
    };
    this.isEditMode = false;
  }
}