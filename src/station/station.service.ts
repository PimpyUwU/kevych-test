import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/database.service';
import { CreateStationDto } from './dto/create-station.dto';

@Injectable()
export class StationService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateStationDto) {
        return this.prisma.station.create({
            data,
        });
    }

    async findOne(id: number) {
        const station = await this.prisma.station.findUnique({
            where: { id },
            include: { Route: true },
        });

        if (!station) {
            throw new NotFoundException(`Station with ID ${id} not found`);
        }

        return station;
    }

    async findAll() {
        return this.prisma.station.findMany({
            include: { Route: true },
        });
    }

    async delete(id: number) {
        const stationExists = await this.prisma.station.findUnique({
            where: { id },
        });

        if (!stationExists) {
            throw new NotFoundException(`Station with ID ${id} not found`);
        }

        return this.prisma.station.delete({
            where: { id },
        });
    }

    async update(id: number, data: CreateStationDto) {
        const stationExists = await this.prisma.station.findUnique({
            where: { id },
        });

        if (!stationExists) {
            throw new NotFoundException(`Station with ID ${id} not found`);
        }

        return this.prisma.station.update({
            where: { id },
            data,
        });
    }
}