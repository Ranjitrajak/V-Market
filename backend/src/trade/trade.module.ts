import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize"
import { ProductModule } from 'src/product/product.module';
import { TradeController } from './trade.controller';
import { Trade } from './trade.model';
import { TradeService } from './trade.service';



@Module({
    imports: [SequelizeModule.forFeature([Trade]),ProductModule],
    controllers: [TradeController],
    providers: [TradeService],
    exports: [SequelizeModule]
  })
  export class TradeModule {}