import { IsString, IsNotEmpty, MaxLength } from "class-validator";
import { IPostBody } from "../interfaces/body-post.interface";
import { IProviders } from "../../../schedule-service/src/interfaces/providers.interface";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(60)
    readonly title: string;

    @IsNotEmpty()
    readonly body: IPostBody;
    readonly providers: IProviders;
    
    readonly uId: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly _id: string;
}