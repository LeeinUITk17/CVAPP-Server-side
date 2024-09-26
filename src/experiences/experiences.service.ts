import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperiencesService {
  constructor(private prisma: PrismaService) {}

  create(createExperienceDto: CreateExperienceDto, userId: number) {
    return this.prisma.experience.create({
      data: {
        company: createExperienceDto.company,
        position: createExperienceDto.position,
        startDate: createExperienceDto.startDate,
        endDate: createExperienceDto.endDate,
        description: createExperienceDto.description,
        user: {
          connect: {
            id: parseInt(userId.toString()),
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.experience.findMany();
  }

  findOne(userId: number) {
    return this.prisma.experience.findUnique({
      where: { id: parseInt(userId.toString()) },
    });
  }

  update(userId: number, updateExperienceDto: UpdateExperienceDto) {
    return this.prisma.experience.update({
      where: { id: parseInt(userId.toString()) },
      data: updateExperienceDto,
    });
  }

  remove(userId: number) {
    return this.prisma.experience.delete({
      where: { id: parseInt(userId.toString()) },
    });
  }
}
