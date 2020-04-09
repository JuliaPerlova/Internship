import { IsString } from "class-validator";

export class CreateSocialDto {
    @IsString()
    readonly provider: string;
    readonly providerId: string;
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly avatar: string;
    readonly accessToken: string;

    readonly userId: string;
    
    readonly expiredAt: Date;
    readonly createdAt: Date;
    readonly _id: string;
}