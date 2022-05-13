const emailConfig = require('../config/email.config')();
const mailgun = require('mailgun-js')(emailConfig);
exports.sendEmail = (email,subject, message) =>
    new Promise((resolve, reject) => {
        const data = {
            from: 'H.Khuraskina <lena.xuraskina@gmail.com>',
            to: `${email}`,
            subject: `${subject}`,
            html: `<p>${message}</p>`,

        };

        mailgun.messages().send(data, (error, body) => {
                if (error) {
                    return reject(error)
                }
                return resolve();
            }
        );
    });