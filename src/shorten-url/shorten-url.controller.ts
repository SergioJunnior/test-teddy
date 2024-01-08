import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ShortenUrlService } from './shorten-url.service';
import { ShortenUrlRequestDto } from './dto/shorten-url-request.dto';

@ApiTags('Shorten Url')
@Controller()
export class ShortenUrlController {
  constructor(private readonly shortenUrlService: ShortenUrlService) {}

  @Post('/add-shortenUrl')
  async shortenUrl(@Body() shortUrlDto: ShortenUrlRequestDto) {
    const { originalUrl, shortUrl, identifier } =
      await this.shortenUrlService.shortenUrl(shortUrlDto);
    return { originalUrl, shortUrl, identifier };
  }
  @Get('/:identifier')
  async redirecionar(@Param('identifier') identifier: string) {
    const longUrl = await this.shortenUrlService.getOriginalUrl(identifier);
    if (longUrl) {
      return { url: longUrl };
    } else {
      return { error: 'URL não encontrada' };
    }
  }

  @Get(':identifier/cliques')
  async obterQuantidadeCliques(@Param('identifier') identifier: string) {
    const clicks = await this.shortenUrlService.getQuantityClicks(identifier);
    if (clicks !== undefined) {
      return { clicks };
    } else {
      return { error: 'URL não encontrada' };
    }
  }
}
