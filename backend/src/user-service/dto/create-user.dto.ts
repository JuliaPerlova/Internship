import { IAddress } from "../interfaces/address.interface";

export class CreateUserDto {
    readonly email: string;
    readonly password: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly gender: string;
    readonly avatar: string;
    readonly avatarId: string;
    readonly address: IAddress;
    readonly phone: string;
    readonly role: Array<string>;
    readonly created_at: Date;
}