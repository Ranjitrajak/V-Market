import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ProductDto } from './product.dto';
import { Product } from './product.model';
import { ProductService } from './product.service';



@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/create')
  async create(@Body() createProduct: ProductDto): Promise<Product> {
    return this.productService.create(createProduct);
  }
}