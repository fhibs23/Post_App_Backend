module.exports = app => {
    const express = require('express');
    const sendMail = express.Router();
    const emailUtil = require('../models/email.model');
    const {sendEmail} = emailUtil;
    sendMail.post(`/api/email`, async (req, res, next) => {
        const {email, subject, message} = req.body;
        try {
            await sendEmail(email, subject, message);
            res.json({message: 'Your query has been sent'});
            await next();
        } catch (e) {
            await next(e);
        }
    });
}