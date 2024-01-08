import { Module } from '@nestjs/common';
import { ShortenUrlService } from './shorten-url.service';
import { ShortenUrlController } from './shorten-url.controller';

@Module({
  controllers: [ShortenUrlController],
  providers: [ShortenUrlService],
  exports: [ShortenUrlService],
})
export class ShortenUrlModule {}
