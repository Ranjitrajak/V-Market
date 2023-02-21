import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductDto } from './product.dto';
import { Product } from './product.model';


@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async create(product: ProductDto): Promise<Product> {
    
    const newProduct = await this.productModel.create({ ...product })

    return newProduct
}

  
}