import nodemailer from 'nodemailer'
import { UserService } from './UserService';

export class MailService{
    env = process.env;
    
    public async mail(email: string, token: string) {
        let account = await UserService.findByEmail(email);
        console.log('Credentials obtained, sending message...');
        let transporter = nodemailer.createTransport({
            type: 'smtp',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            tls: {
                rejectUnauthorized: false
            },
            auth: {
                user: this.env.EMAIL,
                pass: this.env.PASSWORD,
            }
        });

        let mailOptions = {
            from: '"schoolmehome69@gmail.com" <schoolmehome69@gmail.com>',
            subject: 'Réinitialisation du mot de passe',
            to: email, 
            text: 'Cliquer sur le lien ci-dessous pour réinitialiser votre mot de passe',
            html:
                '<p>Bonjour </p>' + account.firstName + account.lastName + 
                '<p>Cliquer sur le lien ci-dessous pour réinitialiser votre mot de passe</p>'+
                '<p> Réinitialiser : ' +
                '<a href="http://localhost:3000/reset?='+ token +' " >'+'Cliquez' +  '</a>',
        };

        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });

        // ({
        //         host: 'smtp.ethereal.email',
        //         port: 587,
        //         auth: {
        //             user: 'donato.kihn@ethereal.email',
        //             pass: 'MRRCFXhvWuPsCRxHU9'
        //         }
        //     })
            // Message object
            // let message = {
            //     from: 'schoolMeHome@admin.fr',
            //     to: 'kasas.isabelle@gmail.com',
            //     //account.email,
            //     subject: 'Réinitialisation du mot de passe',
            //     text: 'Cliquer sur le lien ci-dessous pour réinitialiser votre mot de passe',
            //     html:
            //         '<p>Cliquer sur le lien ci-dessous pour réinitialiser votre mot de passe</p>'+
            //         '<p> Réinitialiser : ' +
            //         '<a href="http://localhost:3000/reset?='+ token +' " >'+'Cliquez' +  '</a>',
            // };
            // // verify connection configuration
            // await transporter.verify(function(error, success) {
            // if (error) {
            //     console.log("ERROR")
            //     console.log(error);
            // } else {
            //     console.log("Server is ready to take our messages");
            //     console.log(success);
            // }
            // });

            // let info = await transporter.sendMail(message, err => {console.log("INFO"); console.log(err)});
            // console.log('Message sent successfully as %s', info, message);
    }
}
export const Mail = new MailService();