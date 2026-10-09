import { Body, Controller, Get, Post, Query, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { products } from './controllers/productController.js';
import { CreateProductDto } from './dto/createProduct.dto.js';
import { get } from 'http';
import { count } from 'console';

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

  @Get('/new')
  @Render('new')
  getNew() {
    return {
      categories: [...new Set(products.map((p) => p.category))],
    };
  }

  @Post('/new')
  @Render('new')
  create(@Body() createProductDto: CreateProductDto) {
    this.appService.create(createProductDto);

    return {
      categories: [...new Set(products.map((p) => p.category))],
      success: `Created "${createProductDto.name}"`,
    };
  }

  @Get('/stats')
  @Render('stats')
  getStats() {
    const count = products.length;
    const sum = products.reduce((acc, p) => acc + p.price, 0);
    const sorted = products.toSorted((a, b) => a.price - b.price);
    return {
      count: count,
      avg: sum / count,
      exp: sorted[sorted.length-1],
      cheap: sorted[0],
    };
  }
}
