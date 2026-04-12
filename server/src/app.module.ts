import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const host = configService.getOrThrow<string>('database.host');
        const port = configService.getOrThrow<number>('database.port');
        const name = configService.getOrThrow<string>('database.name');
        return {
          type: 'oracle',
          username: configService.getOrThrow<string>('database.username'),
          password: configService.getOrThrow<string>('database.password'),
          connectString: `${host}:${port}/${name}`,
          synchronize: true,
        }
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
