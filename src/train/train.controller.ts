import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {CreateTrainDto} from "./dto/create-train.dto";
import {TrainService} from "./train.service";

@Controller('train')
export class TrainController {
    constructor(private readonly trainService: TrainService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body () trainData : CreateTrainDto){
        return this.trainService.create(trainData)
    }

    @Get(":id")
    async findOne(@Param('id') id : string){
        return this.trainService.findOne(Number(id))
    }

    @Get()
    async findAll () {
        return this.trainService.findAll()
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.trainService.delete(Number(id))
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id")
    async update (@Param('id') id: string, @Body() trainData: CreateTrainDto) {
        return this.trainService.update(Number(id), trainData)
    }
}