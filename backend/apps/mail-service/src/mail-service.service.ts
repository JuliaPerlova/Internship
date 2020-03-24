import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';

@Injectable()
export class MailServiceService {
    private static transporter = createTransport({
        service: 'gmail',
        auth: {
            user: 'user@gmail.com',
            pass: 'userpass',
        }
    })

    async confirmEmail(email: string, id: string, token: string) {
        const link = `http://localhost:3000/auth/${id}/confirmation/token=${token}`;
        return await MailServiceService.transporter.sendMail({
            from: 'user@gmail.com',
            to: email,
            subject: 'Verificate your email',
            html: `<h3>We are glad to see you in our community!</h3> 
                   <p>Please click on this link ${link} to confirm your email. Hurry up! This link will be available for one day. </p><br>
                   <p>If you didnt sign up, then please ignore this message.</p>`
        }).then(() => console.log('success')).catch((err) => console.log(err));
    }

    async changePass(email: string, id: string, token: string) {
        const link = `http://localhost:3000/${id}/forgot/token=${token}`;
        return await MailServiceService.transporter.sendMail({
            from: 'user@gmail.com',
            to: email,
            subject: 'Change password request',
            html: `<h3>Forgot your password? It's not a problem for sure!</h3> 
                   <p>Please click on this link ${link} to change your password. Hurry up! This link will be available for one day. </p><br>
                   <p>If you didnt send this requst, we recommend that you contact our support</p>`
        });
    }

}
