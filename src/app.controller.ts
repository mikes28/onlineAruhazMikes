import { Controller, Get, Query, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { products } from './controllers/productController.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      products: products.toSorted((a, b) => a.price - b.price),
    };
  }

  @Get('/filter')
  @Render('filter')
  getFilter(@Query('category') category?: string) {
    return {
      products: products
        .filter((a) => !category || a.category === category)
        .toSorted((a, b) => a.price - b.price),
      categories: [...new Set(products.map((p) => p.category))],
    };
  }
}
