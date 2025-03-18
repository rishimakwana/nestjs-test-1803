import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCustomerDto {
}
export class CreateOrderDto {
    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    productId: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    name: string;

    // @ApiProperty()
    // @IsInt()
    // @IsNotEmpty()
    // quantity: number;
}


