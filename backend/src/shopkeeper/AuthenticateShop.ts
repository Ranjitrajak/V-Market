import { HttpStatus, Injectable, NestMiddleware } from "@nestjs/common"
import { NextFunction, Request, Response } from "express"


import * as bcrypt from "bcrypt"
import { ShopkeeperService } from "./shopkeeper.service"


@Injectable()
export class AuthenticateMiddleware implements NestMiddleware {
	
	constructor(private readonly shopService:ShopkeeperService) {}
	
	async use(req: Request, res: Response, next: NextFunction) {
		const email = req.body.email
		
		const user = await this.shopService.findByEmail(email)
		
		if(!user) return res.status(HttpStatus.NOT_FOUND).send("User Not Found")
		
		const inPassword = req.body.password
		const hashPassword = user.getDataValue("password")
		
		const compare = await bcrypt.compare(inPassword, hashPassword)
		
		if(!compare) return res.status(HttpStatus.FORBIDDEN).send("Wrong Password")
		
		req.body.user = user
		
		next()
	}
}