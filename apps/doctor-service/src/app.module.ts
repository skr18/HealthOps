import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorModule } from './doctor/doctor.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DoctorModule, PrismaModule, ConfigModule.forRoot({
    isGlobal: true, // Makes the .env variables available everywhere
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

