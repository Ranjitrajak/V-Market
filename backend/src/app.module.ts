import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from "@nestjs/sequelize"
import { ShopkeeperModule } from './shopkeeper/shopkeeper.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [SequelizeModule.forRoot({
		dialect: 'postgres',
		host: 'localhost',
		port: 5432,
		username: 'postgres',
		password: 'postgres',
        database: 'vmarket',
        autoLoadModels: true,
		synchronize: true,

	}),ShopkeeperModule,ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
