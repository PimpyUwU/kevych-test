import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStationDto {
    @IsNotEmpty()
    @IsString()
    city: string;
}