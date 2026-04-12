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
        const host = configService.getOrThrow<string>('DB_HOST');
        const port = configService.getOrThrow<number>('DB_PORT');
        const name = configService.getOrThrow<string>('DB_DATABASE');
        return {
          type: 'oracle',
          username: configService.getOrThrow<string>('ORACLE_USERNAME'),
          password: configService.getOrThrow<string>('ORACLE_PASSWORD'),
          connectString: `${host}:${port}/${name}`,
          entities: [],
          synchronize: true,
        }
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
