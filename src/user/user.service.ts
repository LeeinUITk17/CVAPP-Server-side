import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentDto } from './dto/comment-user.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UpdateUserDto } from './dto/update-user.dto';

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
  // async CreateCV(createCV: CreateCvDto, userId: number) {
  //   return this.prisma.cV.create({
  //     data: {
  //       user: {
  //         connect: {
  //           id: parseInt(userId.toString()),
  //         },
  //       },
  //     },
  //   });
  // }
  async getAllUsers() {
    return this.prisma.user.findMany();
  }
  async getAllCVs() {
    return this.prisma.cV.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            avatar: true,
            age: true,
            phone: true,
            address: true,
            linkedin: true,
            github: true,
            summary: true,
          },
        },
      },
    });
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
      // Fetch the user's current avatar URL
      const user = await this.prisma.user.findUnique({
        where: { id: parseInt(userId.toString()) },
        select: { avatar: true },
      });

      //  delete it from Cloudinary
      if (user && user.avatar) {
        const publicId = this.extractPublicIdFromUrl(user.avatar);
        await this.cloudinaryService.deleteFile(publicId);
      }

      // Upload the new file to Cloudinary and get the URL
      const uploadResult = await this.cloudinaryService.uploadFile(file);

      // Update avatar URL
      await this.prisma.user.update({
        where: { id: parseInt(userId.toString()) },
        data: { avatar: uploadResult.secure_url },
      });

      return uploadResult;
    } catch (error) {
      throw new Error(`Failed to upload avatar: ${error.message}`);
    }
  }

  private extractPublicIdFromUrl(url: string): string {
    const parts = url.split('/');
    const fileName = parts[parts.length - 1];
    const publicId = fileName.split('.')[0];
    return publicId;
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
