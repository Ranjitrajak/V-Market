import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize"


import { ShopkeeperController } from './shopkeeper.controller';
import { Shopkeeper } from './shopkeeper.model';
import { ShopkeeperService } from './shopkeeper.service';
import { JwtModule } from "@nestjs/jwt"

import { JwtStrategy } from './jwt.strategy';
import * as dotenv from 'dotenv'
import { AuthenticateMiddleware } from './AuthenticateShop';




dotenv.config()

@Module({
  imports: [SequelizeModule.forFeature([Shopkeeper]), JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: "30m" }
  })],
  controllers: [ShopkeeperController],
  providers: [ShopkeeperService, JwtStrategy],
  exports: [SequelizeModule]
})
export class ShopkeeperModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {

    consumer.apply(AuthenticateMiddleware)
      .forRoutes({
        path: "shop/login",
        method: RequestMethod.POST
      })




  }



}