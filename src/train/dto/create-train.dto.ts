import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTrainDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(2, { message: 'Train name must be at least 2 characters long' })
    @MaxLength(100, { message: 'Train name cannot exceed 100 characters' })
    name: string;
}