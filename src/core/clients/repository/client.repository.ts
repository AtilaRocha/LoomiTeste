import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/postgres/prisma/prisma.service';
import { Client } from '@prisma/client';

@Injectable()
export class ClientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    full_name: string;
    contact: string;
    address: string;
    user_id: number;
    status: boolean;
  }): Promise<Client> {
    return this.prisma.client.create({
      data: {
        full_name: data.full_name,
        contact: data.contact,
        address: data.address,
        status: data.status,
        user: {
          connect: { id: data.user_id },
        },
      },
    });
  }

  async update(id: number, data: Partial<Client>): Promise<Client> {
    return this.prisma.client.update({
      where: { id },
      data,
    });
  }

  async findById(id: number): Promise<Client | null> {
    return this.prisma.client.findUnique({
      where: { id },
      include: {
        user: true,
        orders: true,
      },
    });
  }

  async findOne(where: Partial<Client>): Promise<Client | null> {
    return this.prisma.client.findFirst({
      where,
      include: {
        user: true,
        orders: true,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.client.delete({ where: { id } });
  }

  async findMany(where: Partial<Client> = {}): Promise<Client[]> {
    return this.prisma.client.findMany({
      where,
      include: {
        user: true,
        orders: true,
      },
    });
  }
}
