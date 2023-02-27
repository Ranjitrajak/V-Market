import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/shopkeeper/jwt-auth.guard';
import { Trade } from './trade.model';
import { TradeService } from './trade.service';
import { TradeDto } from './tradeDto';



@Controller('trade')
export class TradeController {
    constructor(private readonly tradeService: TradeService) { }

    
    @Post('/create')
    async create(@Body() createTrade: TradeDto): Promise<Trade> {
        return this.tradeService.create(createTrade);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')

    async getAllTrade(@Param('id', ParseIntPipe) id: number) {

        const importedBy: number = id
        const exportedBy: number = id
        return await this.tradeService.getTradeById(importedBy, exportedBy)
    }

}