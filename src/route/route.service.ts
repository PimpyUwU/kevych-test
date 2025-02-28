import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../database/database.service";
import { CreateRoute } from "./dto/create-route.dto";

@Injectable()
export class RouteService {
    constructor(private prisma: PrismaService) {}

    async create(routeData: CreateRoute) {
        return this.prisma.route.create({
            data: {
                date: new Date(routeData.date),
                trainId: Number(routeData.trainId),
                stationId: Number(routeData.stationId),
            },
        });
    }

    async findOne(id: number) {
        const route = await this.prisma.route.findUnique({
            where: { id },
            include: { train: true, station: true },
        });
        if (!route) throw new NotFoundException(`Route with ID ${id} not found`);
        return route;
    }

    async findAll() {
        return this.prisma.route.findMany({
            include: { train: true, station: true },
        });
    }

    async update(id: number, routeData: CreateRoute) {
        await this.findOne(id); // Ensure route exists
        return this.prisma.route.update({
            where: { id },
            data: {
                date: new Date(routeData.date),
                trainId: Number(routeData.trainId),
                stationId: Number(routeData.stationId),
            },
        });
    }

    async delete(id: number) {
        await this.findOne(id); // Ensure route exists
        return this.prisma.route.delete({
            where: { id },
        });
    }
}
