const facebookPostTemplate = {
    provider: 'facebook',
    title: false,
    attachments: {
        image: true,
        video: true,
        maxAttachLength: 10,
    },
    html: false,
    text: true,
    maxTextLength: 63000,
};

export default facebookPostTemplate;