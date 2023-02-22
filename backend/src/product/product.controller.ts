import { Controller, Get, Post, Body, Param, Delete,ParseIntPipe,UseGuards,Put ,HttpException, HttpStatus, } from '@nestjs/common';
import { JwtAuthGuard } from 'src/shopkeeper/jwt-auth.guard';
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

  @Put('/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateData: Partial<Product>,): Promise<Product> {
    const [rowsUpdated, [updatedUser]] = await this.productService.updateProduct(id, updateData);
    if (!rowsUpdated) {

      throw new HttpException("Something went wrong ", HttpStatus.BAD_REQUEST)
    }
    return updatedUser;
  }
  @Get('/:shopId')
	async getAllProduct(@Param('shopId') shopId:number) {
		return await this.productService.findById(shopId)
	}

 
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
	async deleteCartItems(@Param('id', ParseIntPipe) id: number) {
		return await this.productService.deleteById(id)
	}
}