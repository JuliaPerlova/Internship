import { IsString, IsNotEmpty } from "class-validator";

export class CreateAttachDto {
    @IsString()
    @IsNotEmpty()
    readonly link: string;
    readonly fileId: string;
    readonly contentType: string;

    readonly postId: string;
    readonly createdAt: Date;
}