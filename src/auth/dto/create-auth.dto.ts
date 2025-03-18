import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches, IsOptional } from 'class-validator';


export class CommonUserDto {

    @ApiProperty({
        description: 'Email address',
        example: 'johndoe@example.com',
    })
    @IsEmail()
    @IsNotEmpty()
    @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: 'Email address is not valid.',
    })
    readonly email: string;

    @ApiProperty({
        description: 'Password',
        example: 'StrongPassword@123',
    })
    @IsString()
    @IsNotEmpty()
    readonly password: string;

}
export class CreateUserDto extends CommonUserDto {
    @ApiProperty({
        description: 'Full name',
        example: 'John Doe',
    })
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    fullName: string;
}

