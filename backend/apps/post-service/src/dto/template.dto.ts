export class CreateTemplateDto {
    readonly provider: string;
    readonly title: boolean;
    readonly attachments: {
        image: boolean,
        video: boolean,
        maxAttachLenght: number,
    };
    readonly html: boolean;
    readonly text: boolean;
    readonly maxTextLength: number;
    readonly _id: string;
}