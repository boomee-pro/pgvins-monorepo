import { Injectable } from '@nestjs/common';
import { Prisma, Wine } from '@prisma/client';

import { PrismaService } from 'src/prisma.service';

@Injectable()
export class WinesService {
  constructor(private prisma: PrismaService) {}

  findOne(
    wineWhereUniqueInput: Prisma.WineWhereUniqueInput,
  ): Promise<Wine | null> {
    return this.prisma.wine.findUnique({ where: wineWhereUniqueInput });
  }

  find(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.WineWhereUniqueInput;
    where?: Prisma.WineWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<Wine[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.wine.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  create(data: Prisma.WineCreateInput): Promise<Wine> {
    return this.prisma.wine.create({
      data,
    });
  }

  update(params: {
    where: Prisma.WineWhereUniqueInput;
    data: Prisma.WineUpdateInput;
  }): Promise<Wine> {
    const { where, data } = params;
    return this.prisma.wine.update({
      data,
      where,
    });
  }

  delete(where: Prisma.WineWhereUniqueInput): Promise<Wine> {
    return this.prisma.wine.delete({
      where,
    });
  }
}
