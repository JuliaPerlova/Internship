import { IsString, IsNotEmpty, MaxLength } from "class-validator";
import { IPostBody } from "../interfaces/body-post.interface";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(60)
    readonly title: string;

    @IsNotEmpty()
    readonly body: IPostBody;
    readonly providerId: string;
    
    readonly uId: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly _id: string;
}