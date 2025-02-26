import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { AuthPayloadDto } from "../dto/auth.dto";
import { Request } from "express"; // ✅ Import Express Request

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractJWT
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    private static extractJWT(req: Request): string | null {
        if (req.cookies && 'access_token' in req.cookies) {
            return req.cookies.access_token;
        }
        return null;
    }

    async validate(payload): Promise<AuthPayloadDto> {
        return { id: payload.id, email: payload.email, password: payload.password, name: payload.name };
    }
}
