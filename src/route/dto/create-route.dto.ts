import { IsDate, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRoute {
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date) // This comes from class-transformer, not class-validator
    date: Date;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive({ message: 'Train ID must be a positive number' })
    trainId: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive({ message: 'Station ID must be a positive number' })
    stationId: number;
}