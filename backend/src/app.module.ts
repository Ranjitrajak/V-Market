import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from "@nestjs/sequelize"
import { ShopkeeperModule } from './shopkeeper/shopkeeper.module';
import { ProductModule } from './product/product.module';
import { TradeModule } from './trade/trade.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ ConfigModule.forRoot({
	envFilePath: '.env',
	isGlobal: true
  }),SequelizeModule.forRoot({
		dialect: 'postgres',
		host: 'localhost',
		port: parseInt(process.env.Pg_Port),
		username: 'postgres',
		password: process.env.Pg_Password,
        database: 'vmarket',
        autoLoadModels: true,
		synchronize: true,

	}),ShopkeeperModule,ProductModule,TradeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
