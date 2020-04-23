import { Injectable } from '@nestjs/common';
import * as fetch from 'node-fetch';
import * as fs from 'fs';
import * as request from 'request';

import { CreatePostDto } from '../../../../post-service/src/dto/post.dto';
import { CreateTemplateDto } from '../../../../post-service/src/dto/template.dto';
import { CreateAttachDto } from '../../../../post-service/src/dto/attachment.dto';

import * as linkedinOptions from '../options/linkedin.options';

@Injectable()
export class LinkedinApiService {
    constructor() {}

    async sharePost(createPostDto: CreatePostDto, 
        createTemplateDto: CreateTemplateDto, 
        accessToken: string) {
        if (createTemplateDto.attachments.video) {
            return await this.createVideoShare(createPostDto, accessToken);
        }
        console.log('something');
        const { providerId, title } = createPostDto;
        const { text, attachments } = createPostDto.body;
        const {content, body } = linkedinOptions.createBodyShare(title, text, providerId, accessToken);
        console.log('here');
        const images = await Promise.all(attachments.map(async(img) => {
            console.log('is');
            const image = await this.uploadImage(img, providerId, accessToken);
            return image;
        }));

        images.map((img) => {
            console.log(img);
            content.contentEntities.push({ entity: img })
        });

        if (content.contentEntities.length > 0) {
            body['content'] = content;
        }

        return body;

    }

    createShare(createPostDto: CreatePostDto, 
        createTemplateDto: CreateTemplateDto,
        accessToken: string,
        links?: string[]) {

        const { providerId, title } = createPostDto;
        const { text, attachments } = createPostDto.body;
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

    async upload(image: CreateAttachDto, url: string, headers: object) {
        const { link, fileId, contentType } = image;
        const imgName = `${fileId}.${contentType}`;

        const stream = request(link).pipe(fs.createWriteStream(imgName));
            await stream.on('close', async () => {
                return await fs.readFile(imgName, async(err, data) => {
                    if (err) throw err;

                    const encodedImage = new Buffer(data);

                    await fetch(url, {
                        method: 'PUT',
                        body: encodedImage,
                        headers,
                    }).then((res) => console.log(res)).catch((err) => err);
                })
        });
    }

    registerImage(providerId: string, accessToken: string) {
        return linkedinOptions.registerImage(providerId, accessToken);
    }

    async uploadImage(image: CreateAttachDto, providerId: string, accessToken: string) {
        const { body, headers } = linkedinOptions.registerImage(providerId, accessToken);

        let uploadUrl;
        let asset;

        await fetch('https://api.linkedin.com/v2/assets?action=registerUpload', {
            method: 'POST',
            body,
            headers,
        })
        .then(async (res) => {
            const response = await res.text();
            const parsed = JSON.parse(response);
            const data = parsed
                .value
                .uploadMechanism["com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"];

            uploadUrl = data.uploadUrl;
            asset = parsed.value.asset;
        });

        await this.upload(image, uploadUrl, { "Authorization": `Bearer ${accessToken}` });

        return asset;
    }

    createVideoShare(createPostDto: CreatePostDto, accessToken: string) {
        const { providerId, title } = createPostDto;
        const { text, attachments } = createPostDto.body;
        const { body, headers } = linkedinOptions
            .createBodyShare(title, text, providerId, accessToken);
        
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