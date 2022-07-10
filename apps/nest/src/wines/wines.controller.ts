import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { ApiResponse } from 'src/models/api.model';
import { CreateWineDto } from './dto/wines.dto';
import { WinesService } from './wines.service';

@Controller('wines')
export class WinesController {
  constructor(private readonly winesService: WinesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createWineDto: CreateWineDto): Promise<ApiResponse> {
    const wine = await this.winesService.create(createWineDto);
    return {
      message: 'success',
      data: wine,
    };
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<ApiResponse> {
    const wine = await this.winesService.findOne({ id });
    return {
      message: 'success',
      data: wine,
    };
  }

  @Get()
  async getAll(): Promise<ApiResponse> {
    const wines = await this.winesService.find({});
    return {
      message: 'success',
      data: wines,
    };
  }

  @Get('/origin/:origin')
  async getByOrigin(@Param('origin') origin: string): Promise<ApiResponse> {
    const wines = await this.winesService.find({
      where: {
        origin,
      },
    });
    return {
      message: 'success',
      data: wines,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWine: Prisma.WineCreateInput,
  ) {
    const wine = await this.winesService.update({
      where: { id },
      data: updateWine,
    });
    return {
      message: 'success',
      data: wine,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ApiResponse> {
    const wine = await this.winesService.delete({ id });
    return {
      message: 'success',
      data: wine,
    };
  }
}
