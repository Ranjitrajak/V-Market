import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize"
import { HashPasswordMiddleware } from './hashPassword.middleware';
import { ShopkeeperController } from './shopkeeper.controller';
import { Shopkeeper } from './shopkeeper.model';
import { ShopkeeperService } from './shopkeeper.service';
import { JwtModule } from "@nestjs/jwt"
import { AuthenticateMiddleware } from './AuthenticateShop';
import { GeneratejwtMiddleware } from './generateToken';

@Module({
    imports: [SequelizeModule.forFeature([Shopkeeper]),JwtModule.register({
      secret:'shop',
      signOptions: { expiresIn: "30m" }
    })],
    controllers: [ShopkeeperController],
    providers: [ShopkeeperService],
    exports: [SequelizeModule]
  })
  export class ShopkeeperModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
      consumer.apply(HashPasswordMiddleware)
        .forRoutes({
          path: 'shop/create',
          method: RequestMethod.POST
        })
        consumer.apply(AuthenticateMiddleware)
        .forRoutes({
          path: "shop/login",
          method: RequestMethod.POST
        })
      consumer.apply(GeneratejwtMiddleware)
        .forRoutes({
          path: "shop/login",
          method: RequestMethod.POST
        })



      }

      

  }