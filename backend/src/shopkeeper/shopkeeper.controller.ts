import { Controller, Get, Post, Body, Param, Delete ,Req,UseGuards,HttpException,HttpStatus} from '@nestjs/common';
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

  @Post('/signup')
  async create(@Body() createShop: ShopkeeperDto): Promise<Shopkeeper> {
	const user= await this.shopkeeperService.findByEmail(createShop.email)
	if(user){
		throw  new HttpException("email already exist", HttpStatus.BAD_REQUEST)
	}
    return this.shopkeeperService.create(createShop);
  }
  @Post('/login')
	async loginUser(@Req() req: Request, @Body() user: logUser) {
		return req.body.access_token
	}

  @Get('/all')
	async getAllShop() {
		return await this.shopkeeperService.findAll()
	}
  
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
	async getUser(@Param('id') id:number) {
		return  await this.shopkeeperService.findById(id)
		
	}

	
	@UseGuards(JwtAuthGuard)
	@Get('/email/:email')
	async getUserByEmail(@Param('email') email: string) {
		return  await this.shopkeeperService.findByEmail(email)
		
	}
 
}