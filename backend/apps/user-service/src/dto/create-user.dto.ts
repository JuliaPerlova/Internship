import { IsEmail, IsString, IsDate, Matches, IsNotEmpty } from 'class-validator';
import { IAddress } from "../interfaces/address.interface";


export class CreateUserDto {
    @IsEmail()
    readonly email: string;

    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/m, 
        { message: 'Weak password'},
    )
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    readonly login: string;

    readonly status: string;
    readonly gender: string;
    readonly avatar: string;
    readonly avatarId: string;
    readonly phone: string;
    readonly role: string;
    readonly createdAt: Date;
    readonly address: IAddress;
    readonly _id: string;

}