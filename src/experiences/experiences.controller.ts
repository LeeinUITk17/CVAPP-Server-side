import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('experiences')
@UseGuards(AuthGuard('jwt'))
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Post()
  create(
    @Param('id', ParseIntPipe) userId: number,
    @Body() createExperienceDto: CreateExperienceDto,
  ) {
    return this.experiencesService.create(createExperienceDto, userId);
  }

  @Get()
  findAll() {
    return this.experiencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) userId: number) {
    return this.experiencesService.findOne(userId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updateExperienceDto: UpdateExperienceDto,
  ) {
    return this.experiencesService.update(userId, updateExperienceDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) userId: number) {
    return this.experiencesService.remove(userId);
  }
}
