import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  private findProduct(id: string) {
    const productIdx = this.products.findIndex((prod) => prod.id === id);
    const product = this.products[productIdx];
    if (productIdx < 0) {
      throw new NotFoundException('No product Found');
    }
    return { product: product, index: productIdx };
  }

  insertProduct(title: string, description: string, price: number) {
    const prodId = uuid();
    const newProduct = new Product(prodId, title, description, price);
    this.products.push(newProduct);
    return prodId;
  }

  getAllProducts() {
    return [...this.products];
  }

  getProduct(productId: string) {
    const { product } = this.findProduct(productId);
    return { ...product };
  }

  updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const { product, index } = this.findProduct(productId);
    const updatedProduct = { ...product };
    if (title) updatedProduct.title = title;
    if (description) updatedProduct.description = description;
    if (price) updatedProduct.price = price;

    this.products[index] = updatedProduct;
    return { product: this.products[index] };
  }

  removeProduct(productId: string) {
    const { index } = this.findProduct(productId);
    this.products.splice(index, 1);
    return 'Product removed';
  }
}
