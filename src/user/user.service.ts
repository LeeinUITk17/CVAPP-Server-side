import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentDto } from './dto/comment-user.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateCvDto } from './dto/cv-user.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}
  async bulkCreate(createUserDtos: CreateUserDto[]) {
    return this.prisma.user.createMany({
      data: createUserDtos.map((dto) => ({
        name: dto.name,
        email: dto.email,
        age: dto.age,
        phone: dto.phone,
        address: dto.address,
        linkedin: dto.linkedin,
        github: dto.github,
        summary: dto.summary,
        avatar: dto.avatar,
        password: dto.password,
      })),
      skipDuplicates: true,
    });
  }
  async CreateCV(createCV: CreateCvDto, userId: number) {
    return this.prisma.cV.create({
      data: {
        title: createCV.title,
        description: createCV.description,
        user: {
          connect: {
            id: parseInt(userId.toString()),
          },
        },
      },
    });
  }
  async getAllUsers() {
    return this.prisma.user.findMany();
  }
  async clearAllUsers() {
    return this.prisma.user.deleteMany();
  }
  async createComment(comment: CommentDto, userId: number, cvId: number) {
    const newComment = await this.prisma.comment.create({
      data: {
        text: comment.text,
        user: {
          connect: {
            id: parseInt(userId.toString()),
          },
        },
        cv: {
          connect: {
            id: parseInt(cvId.toString()),
          },
        },
      },
    });
    return newComment;
  }
  async getUserComments() {
    return this.prisma.comment.findMany();
  }
  async removeAllComments() {
    return this.prisma.comment.deleteMany();
  }
  async uploadUserAvatar(
    file: Express.Multer.File,
    userId: number,
  ): Promise<any> {
    try {
      // Upload file lên Cloudinary và lấy URL
      const uploadResult = await this.cloudinaryService.uploadFile(file);

      // Cập nhật URL vào avatar
      await this.prisma.user.update({
        where: { id: parseInt(userId.toString()) },
        data: { avatar: uploadResult.secure_url },
      });

      return uploadResult;
    } catch (error) {
      throw new Error(`Failed to upload avatar: ${error.message}`);
    }
  }
  async updateProfile(updateUserDto: UpdateUserDto, userId: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
        age: updateUserDto.age,
        phone: updateUserDto.phone,
        address: updateUserDto.address,
        linkedin: updateUserDto.linkedin,
        github: updateUserDto.github,
        summary: updateUserDto.summary,
      },
    });
  }
  async likeCV(userId: number, cvId: number) {
    const newLike = await this.prisma.cVLike.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        cv: {
          connect: {
            id: cvId,
          },
        },
      },
    });
    return newLike;
  }

  async removeLike(userId: number, cvId: number) {
    return this.prisma.cVLike.delete({
      where: {
        userId_cvId: {
          userId,
          cvId,
        },
      },
    });
  }
  async getCommentsOfCV(cvId: number) {
    return this.prisma.comment.findMany({
      where: {
        cvId: cvId,
      },
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
    });
  }
}
