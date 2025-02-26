import { Module } from '@nestjs/common';
import { PrismaService } from './database.service'; // Ensure correct path

@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
export class DatabaseModule {}
