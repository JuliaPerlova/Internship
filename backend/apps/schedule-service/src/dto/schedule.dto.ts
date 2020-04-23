export class CreateScheduleDto {
    readonly uId: string;
    readonly providersId: Array<string>;
    readonly postId: string;
    readonly notify: boolean;
    readonly status: string;
}