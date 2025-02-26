import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {CreateRoute} from "./dto/create-route.dto";
import {RouteService} from "./route.service";

@Controller('route')
export class RouteController {
    constructor(private readonly routeService: RouteService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body () routeData : CreateRoute){
        return this.routeService.create(routeData)
    }

    @Get(":id")
    async findOne(@Param('id') id : string){
        return this.routeService.findOne(Number(id))
    }

    @Get()
    async findAll () {
        return this.routeService.findAll()
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.routeService.delete(Number(id))
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id")
    async update (@Param('id') id: string, @Body() routeData: CreateRoute) {
        return this.routeService.update(Number(id), routeData)
    }
}