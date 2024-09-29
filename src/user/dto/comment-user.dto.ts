/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsInt } from 'class-validator';

export class CommentDto {
  @IsNotEmpty({ message: 'Text should not be empty' })
  text: string;

  @IsInt({ message: 'User ID must be an integer' })
  @IsNotEmpty({ message: 'User ID should not be empty' })
  userId: number;

  @IsInt({ message: 'CV ID must be an integer' })
  @IsNotEmpty({ message: 'CV ID should not be empty' })
  cvId: number;
}