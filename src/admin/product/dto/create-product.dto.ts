import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsEnum, IsInt } from 'class-validator';

export class CreateProductDto {
    @ApiProperty({ example: 'Laptop', description: 'The name of the product' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'https://example.com/image.jpg', description: 'The image URL of the product' })
    imageUrl: string;

    @ApiProperty({ example: 999.99, description: 'The price of the product' })
    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    price: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    stock: number;

    @ApiProperty({ example: 'active', enum: ['active', 'inActive'], description: 'The status of the product' })
    @IsEnum(['active', 'inActive'])
    status: 'active' | 'inActive';

    @ApiProperty({ example: 2, description: 'The store ID where the product belongs' })
    @IsInt()
    @IsNotEmpty()
    storeId: number;
}
