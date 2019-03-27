import nodemailer from 'nodemailer';
import config     from '../config/config'
import logger     from '../common/logger.js'

let datetime = new Date();

function notify(user) {

    let name = user.name;
    let email = user.email;
    let about = user.about;
    let transporter = nodemailer.createTransport(config.mailerOptions);

    let mailOptions = {
        from: 'mohitsharma9109@gmail.com',
        to: email,
        subject: 'Notification',
        text: `Dear ${name}, your ${about} at ${datetime}`

    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            logger.error({message :error.stack})
        } else {
            logger.info({Email_sent : info.response});
        }
    });
}
module.exports = notify;