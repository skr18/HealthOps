import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      throw new Error('DATABASE_URL is missing in .env');
    }
    // 1. Parse the standard connection string
    const url = new URL(dbUrl);

    // 2. Initialize the official driver for MySQL/MariaDB
    const adapter = new PrismaMariaDb({
      host: url.hostname,
      port: Number(url.port) || 3306,
      user: url.username,
      password: url.password,
      database: url.pathname.substring(1), // Removes the leading slash
      connectionLimit: 5, // Built-in connection pooling
      allowPublicKeyRetrieval: true // <-- simply tells the driver, "It's okay, I trust this local Docker container, go ahead and ask for the RSA key."
    });

    // 3. Prisma 7 strictly requires the adapter object
    super({ adapter });

  }

  async onModuleInit() {
    await this.$connect();
  }
}

