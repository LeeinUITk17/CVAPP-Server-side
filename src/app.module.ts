import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { ExperiencesModule } from './experiences/experiences.module';
import { EducationsModule } from './educations/educations.module';
import { SkillsModule } from './skills/skills.module';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ChatModule } from './chat/chat.module';
import { RoomModule } from './room/room.module';
import { RoomUserModule } from './room-user/room-user.module';
@Module({
  imports: [
    UserModule,
    PrismaModule,
    ExperiencesModule,
    EducationsModule,
    SkillsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
    CloudinaryModule,
    ChatModule,
    RoomModule,
    RoomUserModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
