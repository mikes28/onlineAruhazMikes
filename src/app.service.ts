import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/createProduct.dto.js';
import { Product } from './interfaces/productInterface.js';
import { products } from './controllers/productController.js';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  create(dto: CreateProductDto): Product {
        const newProduct: Product = {
            name: dto.name,
            category: dto.category,
            price: dto.price,
            stock: dto.stock,
        };
        products.push(newProduct);
        return newProduct;
    }

}
