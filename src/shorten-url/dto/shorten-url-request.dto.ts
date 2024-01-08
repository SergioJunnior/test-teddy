import { IsNotEmpty, IsString } from 'class-validator';

export class ShortenUrlRequestDto {
  @IsNotEmpty()
  @IsString()
  url: string;
}
