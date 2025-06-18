import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/postgres/prisma/prisma.service';

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  private readonly fullInclude = {
    client: true,
    items: {
      include: {
        product: true,
      },
    },
  };

  async findMany(where: any): Promise<any[]> {
    return this.prisma.order.findMany({
      where,
      include: this.fullInclude,
    });
  }

  async findById(id: number): Promise<any | null> {
    return this.prisma.order.findUnique({
      where: { id },
      include: this.fullInclude,
    });
  }

  async create(data: any): Promise<any> {
    return this.prisma.order.create({
      data,
      include: this.fullInclude,
    });
  }

  async update(id: number, data: any): Promise<any> {
    return this.prisma.order.update({
      where: { id },
      data,
      include: this.fullInclude,
    });
  }

  async delete(id: number): Promise<any> {
    return this.prisma.order.delete({
      where: { id },
    });
  }
}
