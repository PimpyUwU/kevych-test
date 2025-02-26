import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../database/database.service";
import { Prisma } from "@prisma/client";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private databaseService: PrismaService) {}

    async validateUser(authPayload: Prisma.AdminCreateInput) {
        return this.databaseService.$transaction(async (t) => {
            const foundUser = await t.admin.findUnique({
                where: { email: authPayload.email }
            });


            if (!foundUser || !(await bcrypt.compare(authPayload.password, foundUser.password))) {
                return null;
            }

            return this.signTokens(foundUser);
        });
    }

    async createUser(registrationPayload: Prisma.AdminCreateInput) {
        return this.databaseService.$transaction(async (t) => {
            const userExists = await t.admin.findUnique({
                where: { email: registrationPayload.email }
            });

            if (userExists) {
                throw new BadRequestException("Email is already taken");
            }

            const hashedPassword = await this.hashPassword(registrationPayload.password);
            const createdUser = await t.admin.create({
                data: { ...registrationPayload, password: hashedPassword }
            });

            return this.signTokens(createdUser);
        });
    }

    async refreshTokens(refreshToken: string) {
        try {
            const payload = this.jwtService.verify(refreshToken, { secret: process.env.JWT_REFRESH_SECRET });
            const user = await this.databaseService.admin.findUnique({
                where: { id: payload.id }
            });

            if (!user) throw new UnauthorizedException();

            return this.signTokens(user);
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    private async signTokens(user: Prisma.AdminCreateInput) {
        const { password, ...userData } = user;

        const accessToken = this.jwtService.sign(userData, {
            secret: process.env.JWT_SECRET,
            expiresIn: '1h',
        });

        const refreshToken = this.jwtService.sign(userData, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '7d',
        });

        return { accessToken, refreshToken };
    }

    private async hashPassword(password: string) {
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(password, salt);
    }
}
