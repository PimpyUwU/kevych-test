import { Module } from "@nestjs/common";
import { TrainController } from "./train.controller";
import { TrainService } from "./train.service";
import { PrismaService } from "../database/database.service";

@Module({
    controllers: [TrainController],
    providers: [TrainService, PrismaService],
    exports: [TrainService],
})
export class TrainModule {}
