import { IsString, IsDateString } from 'class-validator';

export class CreateUserTokenDto {
    @IsString()
    token: string;

    @IsString()
    uId: string;

    @IsDateString()
    expiredAt: Date;
}