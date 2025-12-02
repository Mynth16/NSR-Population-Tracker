import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from 'generated/prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    // Parse DATABASE_URL for MariaDB adapter
    const url = process.env.DATABASE_URL || '';
    const regex = /mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/;
    const match = regex.exec(url);

    if (match) {
      const [, user, password, host, port, database] = match;
      const adapter = new PrismaMariaDb({
        host,
        port: Number.parseInt(port, 10),
        user,
        password,
        database,
        connectionLimit: 10,
      });
      super({ adapter });
    } else {
      // Fallback for development without proper URL
      const adapter = new PrismaMariaDb({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'nsr_population_tracker',
        connectionLimit: 10,
      });
      super({ adapter });
    }
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
