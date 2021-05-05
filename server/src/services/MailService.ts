import nodemailer from 'nodemailer'
import { UserService } from './UserService';

export class MailService{
    
    public async main(email: string, token: string) {
        let account = await UserService.findByEmail(email);
        console.log(account)
        console.log('Credentials obtained, sending message...');
        let transporter = nodemailer.createTransport(
            {
                host: "smptp.localhost",
                port: 587,
                secure: false,
                auth: {
                    user: account.firstName,
                    pass: account.password
                },
                logger: false,
                debug: false // include SMTP traffic in the logs
            })
            // Message object
            let message = {
                from: account.email,
                to: account.email,
                subject: 'Nodemailer is unicode friendly ✔',
                text: 'Hello to myself!',
                html:
                    '<p><b>Hello</b> to myself ' +
                    '<p>Here\'s a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@example.com"/></p>',
            };
            // verify connection configuration
            await transporter.verify(function(error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log("Server is ready to take our messages");
                console.log(success);
            }
            });

            let info = await transporter.sendMail(message, err => {console.log(err)});
            console.log('Message sent successfully as %s', info, message);
        }
}
export const Mail = new MailService();