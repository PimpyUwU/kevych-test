import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Res,
    UseGuards
} from '@nestjs/common';
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { JwtAuthGuard } from "./guards/jwt.guard";
import { Prisma } from "@prisma/client";
import { AuthPayloadDto } from "./dto/auth.dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.ACCEPTED)
    async login(@Body() body: Prisma.AdminCreateInput, @Res() res: Response) {
        const tokens = await this.authService.validateUser(body);
        if (!tokens) {
            return res.status(HttpStatus.UNAUTHORIZED).send();
        }
        this.setAccessTokenCookie(tokens.accessToken, res);
        this.setRefreshTokenCookie(tokens.refreshToken, res);
        res.send({ message: "Logged in successfully" });
    }

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    async signup(@Body() body: Prisma.AdminCreateInput, @Res() res: Response) {
        const tokens = await this.authService.createUser(body);
        this.setAccessTokenCookie(tokens.accessToken, res);
        this.setRefreshTokenCookie(tokens.refreshToken, res);
        res.send({ message: "User created successfully" });
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    async status(@Req() req: Request & { user: AuthPayloadDto }) {
        return req.user;
    }

    @Post('refresh')
    async refresh(@Req() req: Request, @Res() res: Response) {
        const refreshToken = req.cookies['refresh_token'];
        if (!refreshToken) {
            return res.status(HttpStatus.UNAUTHORIZED).send();
        }

        const tokens = await this.authService.refreshTokens(refreshToken);
        if (!tokens) {
            return res.status(HttpStatus.UNAUTHORIZED).send();
        }

        this.setAccessTokenCookie(tokens.accessToken, res);
        this.setRefreshTokenCookie(tokens.refreshToken, res);
        res.send({ message: "Token refreshed successfully" });
    }

    private setAccessTokenCookie(accessToken: string, res: Response) {
        res.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
            maxAge: 30 * 60 * 1000,
        });
    }

    private setRefreshTokenCookie(refreshToken: string, res: Response) {
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
    }
}
