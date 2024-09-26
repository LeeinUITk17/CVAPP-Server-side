export class CreateExperienceDto {
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  userId: number;
}
