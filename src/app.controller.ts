import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { products } from './controllers/productController.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      products: products.toSorted((a, b) => a.price - b.price)
    };
  }


}
