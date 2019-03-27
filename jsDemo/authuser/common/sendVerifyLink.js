import nodemailer from 'nodemailer';
import bcrypt     from 'bcryptjs';
import config     from '../config/config'
import logger     from '../common/logger.js'

function SendVerifyLink(req, res, next) {
    let token = bcrypt.hashSync(req.body.password, 8);
    let name = req.body.name;
    let email = req.body.email;
    let link = "localhost:4000/Register/verifyEmail" + "/?id=" + token;
    req.body.token = token;

    let transporter = nodemailer.createTransport(config.mailerOptions);
    let mailOptions = {
        from: config.sender,
        to: email,
        subject: 'Sending Email using Node.js',
        text: 'Hi ' + name + ',\n This is a verification email,\n please click on below link to verify.\n' + link

    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            logger.error({message :error.massage})
        } else {
            logger.info({Email_sent : info.response});
        }
    });
    next();
}
module.exports = SendVerifyLink;