import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  UseInterceptors,
  UploadedFile,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CommentDto } from './dto/comment-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('bulk')
  async bulkCreateUsers(@Body() createUserDtos: CreateUserDto[]) {
    return this.userService.bulkCreate(createUserDtos);
  }
  @Get('all')
  async getAll() {
    return this.userService.getAllUsers();
  }
  @Delete('all')
  async clearAllUsers() {
    return await this.userService.clearAllUsers();
  }
  @Post(':id/comment')
  @UseGuards(AuthGuard('jwt'))
  async createComment(
    @Body() comment: CommentDto,
    @Param('id', ParseIntPipe) userId: number,
  ) {
    console.log(comment);
    return await this.userService.createComment(comment, userId);
  }
  @Get('comments')
  async getUserComments() {
    return await this.userService.getUserComments();
  }
  @Delete('comments')
  async removeAllComments() {
    return await this.userService.removeAllComments();
  }
  @Post(':id/avatar')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard('jwt'))
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseIntPipe) userId: number,
  ) {
    return this.userService.uploadUserAvatar(file, userId);
  }
  @Put(':id/profile')
  async updateProfile(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id', ParseIntPipe) userId: number,
  ) {
    return this.userService.updateProfile(updateUserDto, userId);
  }
}
