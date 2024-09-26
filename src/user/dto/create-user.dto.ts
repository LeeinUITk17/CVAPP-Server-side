import { CreateEducationDto } from 'src/educations/dto/create-education.dto';
import { CreateExperienceDto } from 'src/experiences/dto/create-experience.dto';
import { CreateSkillDto } from 'src/skills/dto/create-skill.dto';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  age?: number;
  phone?: string;
  address?: string;
  linkedin?: string;
  github?: string;
  summary?: string;
  avatar?: string;
  experiences?: CreateExperienceDto[];
  educations?: CreateEducationDto[];
  skills?: CreateSkillDto[];
}
