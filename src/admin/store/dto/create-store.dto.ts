import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateStoreDto {
    @ApiProperty({ example: 'Tech Store', description: 'The name of the store' })
    @IsString()
    @IsNotEmpty()
    name: string;
}
