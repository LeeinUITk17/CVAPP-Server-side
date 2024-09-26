export class CreateEducationDto {
  school: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  userId: number;
}
