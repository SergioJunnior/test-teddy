import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('Test Teddy Swagger')
    .setDescription('Api that provides a method to shorten url to Test Teddy')
    .addBearerAuth({
      type: 'http',
    })
    .setVersion('1.0')
    .addTag('TestTeddy')
    .build();

  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
