import { ShortenUrlRequestDto } from './dto/shorten-url-request.dto';
import { ShortenUrlResponseDto } from './dto/shorten-url-response.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class ShortenUrlService {
  constructor(private readonly prisma: PrismaService) {}

  async shortenUrl(
    dto: ShortenUrlRequestDto,
    userId?: number,
  ): Promise<ShortenUrlResponseDto> {
    const identifier = Math.random().toString(36).substring(7);
    const shortUrl = `http://localhost:3000/url/${identifier}`;
    const urlData: ShortenUrlResponseDto = {
      originalUrl: dto.url,
      shortUrl,
      identifier,
      clicks: 0,
    };

    if (userId) {
      await this.prisma.url.create({
        data: {
          ...urlData,
          userId: userId,
        },
      });
    } else {
      await this.prisma.url.create({
        data: urlData,
      });
    }

    return urlData;
  }

  async getOriginalUrl(
    identifier: string,
    id?: number,
  ): Promise<string | undefined> {
    const urlData = await this.prisma.url.findUnique({
      where: { id: id, identifier: identifier },
    });

    if (urlData) {
      await this.prisma.url.update({
        where: { id: id, identifier: identifier },
        data: {
          clicks: urlData.clicks + 1,
        },
      });

      return urlData.originalUrl;
    }

    return undefined;
  }

  async getQuantityClicks(
    identifier: string,
    id?: number,
  ): Promise<number | undefined> {
    const urlData = await this.prisma.url.findUnique({
      where: { id: id, identifier: identifier },
    });

    return urlData ? urlData.clicks : undefined;
  }

  async getUserUrls(userId: number): Promise<ShortenUrlResponseDto[]> {
    const result = this.prisma.url.findMany({
      where: { userId },
    });
    return result;
  }

  async deleteUserUrl(userId: number, identifier: string): Promise<boolean> {
    const result = await this.prisma.url.deleteMany({
      where: { userId: userId, identifier },
    });

    return result.count > 0;
  }
}
