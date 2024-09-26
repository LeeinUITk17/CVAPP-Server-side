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
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('skills')
@UseGuards(AuthGuard('jwt'))
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  create(
    @Param('id', ParseIntPipe) userId: number,
    @Body() createSkillDto: CreateSkillDto,
  ) {
    return this.skillsService.create(createSkillDto, userId);
  }

  @Get()
  findAll() {
    return this.skillsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) userId: number) {
    return this.skillsService.findOne(userId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updateSkillDto: UpdateSkillDto,
  ) {
    return this.skillsService.update(userId, updateSkillDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) userId: number) {
    return this.skillsService.remove(userId);
  }
}
