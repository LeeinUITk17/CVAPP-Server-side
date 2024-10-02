/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [RoomController],
  providers: [RoomService, PrismaService],
  exports: [RoomService],
})
export class RoomModule {}
