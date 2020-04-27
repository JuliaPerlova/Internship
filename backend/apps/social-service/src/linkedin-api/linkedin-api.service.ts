import { Injectable } from '@nestjs/common';
import * as fetch from 'node-fetch';
import * as fs from 'fs';
import * as request from 'request';

import { CreatePostDto } from '../../../post-service/src/dto/post.dto';
import { CreateAttachDto } from '../../../post-service/src/dto/attachment.dto';

import * as linkedinOptions from '../options/linkedin.options';

@Injectable()
export class LinkedinApiService {
    constructor() {}

    createShare(createPostDto: CreatePostDto, 
        providerId: string,
        accessToken: string,
        links?: string[]) {

        const { title } = createPostDto;
        const { text } = createPostDto.body;
        const { content, body, headers } = linkedinOptions
            .createBodyShare(title, text, providerId, accessToken);

        if (!links) {
            return { body: JSON.stringify(body), headers };
        }

        links.map((img) => {
            content.contentEntities.push({ entity: img })
        });

        body['content'] = content;
        return { body: JSON.stringify(body), headers };
    }

    registerImage(providerId: string, accessToken: string) {
        return linkedinOptions.registerImage(providerId, accessToken);
    }

    createVideoShare(createPostDto: CreatePostDto, accessToken: string) {
        const { providers, title } = createPostDto;
        const { text, attachments } = createPostDto.body;
        const { body, headers } = linkedinOptions
            .createBodyShare(title, text, providers.providerId, accessToken);
        
        const content = {
            "contentEntities": [
                {
                    "entityLocation": `${attachments[0].link}`
                }
            ],
            "title": `${title}`
        }

        body['content'] = content;

        return { body: JSON.stringify(body), headers };
    }
}