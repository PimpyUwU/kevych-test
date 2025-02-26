import { Module } from '@nestjs/common';
import { StationController } from './station.controller';
import { StationService } from './station.service';
import { PrismaService } from '../database/database.service'; // Assuming you have a PrismaService

@Module({
    controllers: [StationController],
    providers: [StationService, PrismaService],
    exports: [StationService],
})
export class StationModule {}