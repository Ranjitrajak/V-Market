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
async updateProduct(id: number, updateData: Partial<Product>): Promise<[number,Product[]]> {
  return this.productModel.update(updateData, {
    where: { id },
    returning: true,
  });
}
async findById(shopkeeperId: number): Promise<Product[]> {
  return this.productModel.findAll({ where: { shopkeeperId} });
}


async deleteById(id: number) {
  return await this.productModel.destroy({
    where: { id: id }
  })
}

  
}