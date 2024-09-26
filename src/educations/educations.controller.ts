import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { EducationsService } from './educations.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('educations')
@UseGuards(AuthGuard('jwt'))
export class EducationsController {
  constructor(private readonly educationsService: EducationsService) {}

  @Post()
  create(
    @Param('id', ParseIntPipe) userId: number,
    @Body() createEducationDto: CreateEducationDto,
  ) {
    return this.educationsService.create(createEducationDto, userId);
  }

  @Get()
  findAll() {
    return this.educationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) userId: number) {
    return this.educationsService.findOne(userId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updateEducationDto: UpdateEducationDto,
  ) {
    return this.educationsService.update(userId, updateEducationDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) userId: number) {
    return this.educationsService.remove(userId);
  }
}
