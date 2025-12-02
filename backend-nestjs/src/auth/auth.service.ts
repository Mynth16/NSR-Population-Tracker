import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export class LoginDto {
  username: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    if (!username || !password) {
      throw new UnauthorizedException('Username and password are required');
    }

    const account = await this.prisma.account.findUnique({
      where: { username },
    });

    if (!account) {
      throw new UnauthorizedException('Invalid username or password');
    }

    // Note: Plain text comparison as in original. Should use bcrypt in production!
    if (account.password !== password) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return {
      acc_id: account.accId,
      username: account.username,
      role: account.role,
    };
  }
}
