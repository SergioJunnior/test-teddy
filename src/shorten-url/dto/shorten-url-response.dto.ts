import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ShortenUrlResponseDto {
  @IsNotEmpty()
  @IsNumber()
  identifier: string;

  @IsNotEmpty()
  @IsString()
  originalUrl: string;

  @IsNotEmpty()
  @IsString()
  shortUrl: string;

  @IsNotEmpty()
  @IsNumber()
  clicks: number;
}
