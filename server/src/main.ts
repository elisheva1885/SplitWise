import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.env.APP_PORT ?? 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  // app.useGlobalPipes({
    // whitelist:true
  // })
}
bootstrap().catch((err) => {
  console.error('Error during bootstrap:', err);
});
