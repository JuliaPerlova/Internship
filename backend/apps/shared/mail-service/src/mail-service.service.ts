import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import 'dotenv/config';

@Injectable()
export class MailServiceService {
    private static transporter = createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        }
    })

    async confirmEmail(email: string, token: string) {
        const link = `${process.env.BACK_URL}/auth/confirmation/token=${token}`;
        return await MailServiceService.transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: 'Verificate your email',
            html: `<h3>We are glad to see you in our community!</h3> 
                   <p>Please click on this link ${link} to confirm your email. Hurry up! This link will be available for one day. </p><br>
                   <p>If you didnt sign up, then please ignore this message.</p>`
        }).then(() => console.log('success')).catch((err) => console.log(err));
    }

    async changePass(email: string, token: string) {
        const link = `${process.env.FRONT_URL}/auth/change/token=${token}`;
        return await MailServiceService.transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: 'Change password request',
            html: `<h3>Forgot your password? It's not a problem for sure!</h3> 
                   <p>Please click on this link ${link} to change your password. Hurry up! This link will be available for one day. </p><br>
                   <p>If you didnt send this requst, we recommend that you contact our support</p>`
        }).then(() => console.log('success!')).catch((err) => console.log(err));
    }

}
