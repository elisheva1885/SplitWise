import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy, ExtractJwt} from 'passport-jwt'

interface JwtPayload {
    id: string,
    username: string,
    iat?:number,
    exp?: number
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly configService:ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow<string>('JWT_SECRET')
        })        
    }
    async validate(payload:JwtPayload){
        return payload;
    }
}