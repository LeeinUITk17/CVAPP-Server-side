/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RoomUserService } from './room-user.service';
import { RoomUserController } from './room-user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [RoomUserController],
  providers: [RoomUserService, PrismaService],
  exports: [RoomUserService],
})
export class RoomUserModule {}
