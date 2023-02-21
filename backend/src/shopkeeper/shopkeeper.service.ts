import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ShopkeeperDto } from './shopkeeper.dto';
import { Shopkeeper } from './shopkeeper.model';

@Injectable()
export class ShopkeeperService {
  constructor(
    @InjectModel(Shopkeeper)
    private shopkeeperModel: typeof Shopkeeper,
  ) {}

  async create(shop: ShopkeeperDto): Promise<Shopkeeper> {
    
    const newShop = await this.shopkeeperModel.create({ ...shop })

    return newShop
}
async findByEmail(email: string): Promise<Shopkeeper> {

  return await this.shopkeeperModel.findOne({
    where: {
      email
    }
  })
}

async findById(id: number): Promise<Shopkeeper> {
  return await this.shopkeeperModel.findOne({
    where: {
      id
    }
  })
}


  
}