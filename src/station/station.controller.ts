import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateStationDto } from './dto/create-station.dto';
import { StationService } from './station.service';

@Controller('station')
export class StationController {
    constructor(private readonly stationService: StationService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() stationData: CreateStationDto) {
        return this.stationService.create(stationData);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.stationService.findOne(Number(id));
    }

    @Get()
    async findAll() {
        return this.stationService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.stationService.delete(Number(id));
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() stationData: CreateStationDto) {
        return this.stationService.update(Number(id), stationData);
    }
}