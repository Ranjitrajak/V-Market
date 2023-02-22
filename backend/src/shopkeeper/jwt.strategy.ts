import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { Injectable } from "@nestjs/common"
import { ShopkeeperService } from "./shopkeeper.service"
import { Shopkeeper } from "./shopkeeper.model"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
	constructor(private readonly shopService:ShopkeeperService){
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey:'shop'
		})
	}
	async validate (payload:any){
		const user:Shopkeeper=await this.shopService.findById(payload.id)
		const {name,email,address}=user.toJSON()
		return{name,email,address}
	}
}






