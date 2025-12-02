import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const accounts = await this.prisma.account.findMany({
      select: {
        accId: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        // Exclude password
      },
      orderBy: { username: 'asc' },
    });

    return accounts.map((a) => ({
      acc_id: a.accId,
      username: a.username,
      role: a.role,
      created_at: a.createdAt,
      updated_at: a.updatedAt,
    }));
  }

  async findOne(id: string) {
    const account = await this.prisma.account.findUnique({
      where: { accId: id },
      select: {
        accId: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        // Exclude password
      },
    });

    if (!account) return null;

    return {
      acc_id: account.accId,
      username: account.username,
      role: account.role,
      created_at: account.createdAt,
      updated_at: account.updatedAt,
    };
  }

  async create(createAccountDto: CreateAccountDto) {
    const account = await this.prisma.account.create({
      data: {
        username: createAccountDto.username,
        password: createAccountDto.password, // Note: Should be hashed in production
        role: createAccountDto.role as any,
      },
      select: {
        accId: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      acc_id: account.accId,
      username: account.username,
      role: account.role,
      created_at: account.createdAt,
      updated_at: account.updatedAt,
    };
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    const data: any = {};

    if (updateAccountDto.username) {
      data.username = updateAccountDto.username;
    }
    if (updateAccountDto.password) {
      data.password = updateAccountDto.password; // Note: Should be hashed in production
    }
    if (updateAccountDto.role) {
      data.role = updateAccountDto.role as any;
    }

    const account = await this.prisma.account.update({
      where: { accId: id },
      data,
      select: {
        accId: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      acc_id: account.accId,
      username: account.username,
      role: account.role,
      created_at: account.createdAt,
      updated_at: account.updatedAt,
    };
  }

  async remove(id: string) {
    // Hard delete for accounts
    await this.prisma.account.delete({
      where: { accId: id },
    });

    return { message: 'Account deleted successfully' };
  }
}
