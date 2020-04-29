import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import * as fs from 'fs';
import * as request from 'request';
import * as fetch from 'node-fetch';

import { LinkedinApiService } from './linkedin-api.service';
import { CreateAttachDto } from '../../../post-service/src/dto/attachment.dto';

@Controller()
export class LinkedinApiController {
    constructor(private readonly linkedinService: LinkedinApiService) {}

    async upload(image: CreateAttachDto, url: string, headers: object) {
        const { link, fileId, contentType } = image;
        const arr = link.split('/');
        const imgName = arr[arr.length - 1];

        console.log(imgName);
        const stream = request(link).pipe(fs.createWriteStream(imgName));
        await stream.on('close', async () => {
            return await fs.readFile(imgName, async(err, data) => {
                if (err) throw err;

                const encodedImage = Buffer.from(data);

                await fetch(url, {
                    method: 'PUT',
                    body: encodedImage,
                    headers,
                }).then((res) => res).catch((err) => err);
            })
        });
    }

    @MessagePattern({ cmd: 'linkedin check status' })
    async checkStatus({ asset, accessToken }) {
        await fetch(`https://api.linkedin.com/v2/assets/${asset}`, {
            method: 'GET',
            'Authorization': `Bearer ${accessToken}`
        }).then(async(res) => {
            const response = await res.text();
            const parsed = JSON.parse(response);
            const status = parsed.status;
            return status;
        });
    }

    @MessagePattern({ cmd: 'linkedin upload image' })
    async uploadImage({ attach, providerId, accessToken }) {
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
            const parsed = JSON.parse(response);
            const data = parsed
                .value
                .uploadMechanism["com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"];

            uploadUrl = data.uploadUrl;
            asset = parsed.value.asset;
        });
        const header = {
            'Authorization': `Bearer ${accessToken}`
        };

        await this.upload(attach, uploadUrl, header);

        return asset;

    }

    @MessagePattern({ cmd: 'linkedin create share'})
    async createShare({ post, providerId, accessToken, links }) {
        const data = (links.length === 0) ? 
            this.linkedinService.createShare(post, providerId, accessToken):
            this.linkedinService.createShare(post, providerId, accessToken, links);

        const { body, headers } = data;

        return await fetch('https://api.linkedin.com/v2/shares', {
            method: 'POST',
            body,
            headers,
        }).then(async(response) => {
            const data = await response.text();
            const parsed = JSON.parse(data);
            const link = parsed.activity;
            return link;
        }).catch((err) => console.log(err.headers));

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