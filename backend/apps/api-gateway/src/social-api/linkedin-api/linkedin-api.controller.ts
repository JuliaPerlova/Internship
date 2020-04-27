import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import * as fs from 'fs';
import * as request from 'request';
import * as fetch from 'node-fetch';

import { LinkedinApiService } from './linkedin-api.service';
import { CreateAttachDto } from '../../../../post-service/src/dto/attachment.dto';

@Controller()
export class LinkedinApiController {
    constructor(private readonly linkedinService: LinkedinApiService) {}

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
                }).then((res) => res).catch((err) => err);
            })
        });
    }

    @MessagePattern({ cmd: 'linkedin upload image' })
    async uploadImage({ image, providerId, accessToken }) {
        const { body, headers } = this.linkedinService.registerImage(providerId, accessToken);

        let uploadUrl;
        let asset;

        await fetch('https://api.linkedin.com/v2/assets?action=registerUpload', {
            method: 'POST',
            body,
            headers,
        })
        .then(async (res) => {
            const response = await res.text();
            const data = response
                .value
                .uploadMechanism["com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"];

            uploadUrl = data.uploadUrl;
            asset = response.value.asset;
        });

        await this.upload(image, uploadUrl, headers[0]);

        return asset;

    }

    @MessagePattern({ cmd: 'linkedin create share'})
    async createShare({ post, accessToken, links }) {
        console.log({ post, accessToken, links })
        const data = (links.length === 0) ? 
            this.linkedinService.createShare(post, accessToken):
            this.linkedinService.createShare(post, accessToken, links);

        const { body, headers } = data;

        fetch('https://api.linkedin.com/v2/shares', {
            method: 'POST',
            body,
            headers,
        }).then(async(data) => console.log(await data.text())).catch((err) => console.log(err.headers));

    }

    @MessagePattern({ cmd: 'linkedin create video share' })
    createVideoShare({ post, accessToken }) {
        const data = this.linkedinService.createVideoShare(post, accessToken);

        const { body, headers } = data;

        fetch('https://api.linkedin.com/v2/shares', {
            method: 'POST',
            body,
            headers,
        }).then(async(data) => console.log(await data.text())).catch((err) => console.log(err.headers));
        
    }
}