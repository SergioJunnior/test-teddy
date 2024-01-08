import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShortenUrlModule } from './shorten-url/shorten-url.module';
import { RouterModule } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtStrategy } from './auth/strategies/jwt.strategy';

@Module({
  imports: [
    ShortenUrlModule,
    AuthModule,
    UsersModule,
    PrismaModule,
    RouterModule.register([{ path: 'shorten-url', module: ShortenUrlModule }]),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
