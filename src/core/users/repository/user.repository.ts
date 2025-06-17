import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/postgres/prisma/prisma.service';
import type { User, Prisma, Role } from '@prisma/client';
import { UserRole } from 'src/shared/user-role.enum';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  protected readonly relation = { client: true };

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: this.relation,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
      include: this.relation,
    });
  }

  async findManyByFilters(
    filters: Partial<{ name: string; email: string; type: UserRole }>,
  ): Promise<User[]> {
    const where: Prisma.UserWhereInput = {};

    if (filters.name)
      where.name = { contains: filters.name, mode: 'insensitive' };
    if (filters.email)
      where.email = { contains: filters.email, mode: 'insensitive' };
    if (filters.type) where.type = filters.type as Role;

    return this.prisma.user.findMany({
      where,
      include: this.relation,
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: this.relation,
    });
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
      include: this.relation,
    });
  }

  async delete(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
