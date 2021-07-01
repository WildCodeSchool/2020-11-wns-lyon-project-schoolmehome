"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mail = exports.MailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const UserService_1 = require("./UserService");
class MailService {
    constructor() {
        this.env = process.env;
    }
    async mail(email, token) {
        let account = await UserService_1.UserService.findByEmail(email);
        console.log('Credentials obtained, sending message...');
        let transporter = nodemailer_1.default.createTransport({
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
            html: '<p>Bonjour </p>' + account.firstName + account.lastName +
                '<p>Cliquer sur le lien ci-dessous pour réinitialiser votre mot de passe</p>' +
                '<p> Réinitialiser : ' +
                '<a href="http://localhost:3000/reset?=' + token + ' " >' + 'Cliquez' + '</a>',
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
exports.MailService = MailService;
exports.Mail = new MailService();
