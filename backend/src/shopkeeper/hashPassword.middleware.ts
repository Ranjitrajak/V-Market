import { Injectable, NestMiddleware } from "@nestjs/common"
import { NextFunction, Request, Response } from "express"

import * as bcrypt from 'bcrypt'


@Injectable()
export class HashPasswordMiddleware implements NestMiddleware {
	private salt = 10
	
	async use(req: Request, res: Response, next: NextFunction) {
		const inPassword = req.body.password
		
		req.body.password = await bcrypt.hash(inPassword, this.salt)
		
		next()
	}
	
}