import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class BasePaginationDto {
    @ApiProperty({ required: false, default: 1 })
    @IsOptional()
    pageNo?: number;

    @ApiProperty({ required: false, default: 10 })
    @IsOptional()
    pageSize?: number;
}

export class ProductsPaginationDto extends BasePaginationDto {

    @ApiProperty({ example: 2, description: 'The store ID where the product belongs' })
    @IsNotEmpty()
    storeId: number;
}