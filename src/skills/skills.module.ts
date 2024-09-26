import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SkillsController],
  providers: [SkillsService, PrismaService],
})
export class SkillsModule {}
