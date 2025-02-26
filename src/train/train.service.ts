import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../database/database.service";
import { CreateTrainDto } from "./dto/create-train.dto";

@Injectable()
export class TrainService {
    constructor(private readonly prisma: PrismaService) {}

    async create(trainData: CreateTrainDto) {
        return this.prisma.train.create({ data: trainData });
    }

    async findOne(id: number) {
        const train = await this.prisma.train.findUnique({ where: { id } });
        if (!train) throw new NotFoundException("Train not found");
        return train;
    }

    async findAll() {
        return this.prisma.train.findMany();
    }

    async delete(id: number) {
        return this.prisma.train.delete({ where: { id } });
    }

    async update(id: number, trainData: CreateTrainDto) {
        return this.prisma.train.update({
            where: { id },
            data: trainData,
        });
    }
}
