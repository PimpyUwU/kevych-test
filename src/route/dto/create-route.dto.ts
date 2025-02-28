import { IsDate, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRoute {
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    date: Date;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    trainId: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    stationId: number;
}