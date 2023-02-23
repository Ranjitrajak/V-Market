import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Trade } from './trade.model';
import { TradeDto } from './tradeDto';
import { Op } from 'sequelize';
import { Shopkeeper } from 'src/shopkeeper/shopkeeper.model';
import { Product } from 'src/product/product.model';

@Injectable()
export class TradeService {
  constructor(
    @InjectModel(Trade)
    private tradeModel: typeof Trade,
  ) {}

  async create(trade: TradeDto): Promise<Trade> {
    
    const newTrade = await this.tradeModel.create({ ...trade })
   return newTrade
}
async getTradeById(importedBy: number, exportedBy: number): Promise<Trade[]> {
    return this.tradeModel.findAll({
      where: {
        [Op.or]: [{ importedBy: importedBy }, { exportedBy: exportedBy }],
      },
      // include: [{ model: Shopkeeper, as: 'exporter' },{ model: Shopkeeper, as: 'importer' },Product]
    });
  }



}