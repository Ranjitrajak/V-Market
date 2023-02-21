import { Controller, Get, Post, Body, Param, Delete ,Req,UseGuards} from '@nestjs/common';
import { ShopkeeperDto } from './shopkeeper.dto';
import { Shopkeeper } from './shopkeeper.model';
import { ShopkeeperService } from './shopkeeper.service';
import { Request } from "express"
import { JwtAuthGuard } from './jwt-auth.guard';

interface logUser {
	email: string
	password: string
}


@Controller('shop')
export class ShopkeeperController {
  constructor(private readonly shopkeeperService: ShopkeeperService) {}

  @Post('/create')
  async create(@Body() createShop: ShopkeeperDto): Promise<Shopkeeper> {
    return this.shopkeeperService.create(createShop);
  }
  @Post('/login')
	async loginUser(@Req() req: Request, @Body() user: logUser) {
		return req.body.access_token
	}
 
}