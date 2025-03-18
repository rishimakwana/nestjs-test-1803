import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import configENV from 'src/config/configuration';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = configENV().common.port;
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Ecommerce..')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth(undefined, 'Authorization')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('', app, document);


  await app.listen(port as string, '0.0.0.0');
  console.log("----------------------------------Application running on port:", port, "-----------------------------------------")
}
bootstrap();
