import 'reflect-metadata'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const port = process.env.APP_PORT ?? 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe(
      {
        whitelist: true,
        forbidNonWhitelisted:true,
        transform: true
      })
  )
  await app.listen(port);
 
}
bootstrap().catch((err) => {
  console.error('Error during bootstrap:', err);
});
