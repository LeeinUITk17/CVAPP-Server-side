import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SkillsService {
  constructor(private prisma: PrismaService) {}

  create(createSkillDto: CreateSkillDto, userId: number) {
    return this.prisma.skill.create({
      data: {
        name: createSkillDto.name,
        level: createSkillDto.level,
        user: {
          connect: {
            id: parseInt(userId.toString()),
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.skill.findMany();
  }

  findOne(userId: number) {
    return this.prisma.skill.findUnique({
      where: { id: parseInt(userId.toString()) },
    });
  }

  update(userId: number, updateSkillDto: UpdateSkillDto) {
    return this.prisma.skill.update({
      where: { id: parseInt(userId.toString()) },
      data: updateSkillDto,
    });
  }

  remove(userId: number) {
    return this.prisma.skill.delete({
      where: { id: parseInt(userId.toString()) },
    });
  }
}
