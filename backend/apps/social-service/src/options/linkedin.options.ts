export const registerImage = (providerId: string, accessToken: string) => {
    const body = {
        "registerUploadRequest": {
            "owner": `urn:li:person:${providerId}`,
            "recipes": [
                "urn:li:digitalmediaRecipe:feedshare-image"
            ],
            "serviceRelationships": [
                {
                    "identifier": "urn:li:userGeneratedContent",
                    "relationshipType": "OWNER"
                }
            ]
        }
    };

    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-type': 'application/json',
    }

    return { body: JSON.stringify(body), headers };
};

export const createBodyShare = (
    title: string, 
    text: string, 
    providerId: string, 
    accessToken: string) => {
    const content = {
        "contentEntities": [],
            "title": `${title}`,
            "description": `${title}`,
            "shareMediaCategory": "IMAGE"
    }

    const body = {
        "owner": `urn:li:person:${providerId}`,
            "text": {
                "text": `${text}`
            },
            "subject": `${title}`,
            "distribution": {
                "linkedInDistributionTarget": {}
            },
    }

    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-type': 'application/json',
        'cache-control': 'no-cache',
        'X-Restli-Protocol-Version': '2.0.0',
        'x-li-format': 'json',
    }

    return { content, body, headers };
};