import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@Injectable()
export class EducationsService {
  constructor(private prisma: PrismaService) {}

  create(createEducationDto: CreateEducationDto, userId: number) {
    return this.prisma.education.create({
      data: {
        school: createEducationDto.school,
        degree: createEducationDto.degree,
        field: createEducationDto.field,
        startDate: createEducationDto.startDate,
        endDate: createEducationDto.endDate,
        user: {
          connect: {
            id: parseInt(userId.toString()),
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.education.findMany();
  }

  findOne(userId: number) {
    return this.prisma.education.findUnique({
      where: { id: parseInt(userId.toString()) },
    });
  }

  update(userId: number, updateEducationDto: UpdateEducationDto) {
    return this.prisma.education.update({
      where: { id: parseInt(userId.toString()) },
      data: updateEducationDto,
    });
  }

  remove(userId: number) {
    return this.prisma.education.delete({
      where: { id: parseInt(userId.toString()) },
    });
  }
}
