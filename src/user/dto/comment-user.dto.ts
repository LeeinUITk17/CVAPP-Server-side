/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class CommentDto {
  @IsNotEmpty({ message: 'Text should not be empty' })
  text: string;
  userId: number;
}
