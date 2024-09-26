import { Module } from '@nestjs/common';
import { EducationsService } from './educations.service';
import { EducationsController } from './educations.controller';
import { PrismaService } from 'src/prisma/prisma.service';
@Module({
  controllers: [EducationsController],
  providers: [EducationsService, PrismaService],
})
export class EducationsModule {}
