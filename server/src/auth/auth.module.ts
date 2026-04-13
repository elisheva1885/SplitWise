import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { userController } from 'src/user/user.controller';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { JwtStarategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    secret: configService.getOrThrow<string>('JWT_SECRET') ,
                    signOptions: { expiresIn: configService.getOrThrow<number>('EXPIRES_IN_JWT') },
                }
            }
        }),
    ],
    providers: [AuthService, JwtStarategy],
    exports: [JwtModule]
})
export class AuthModule { }
