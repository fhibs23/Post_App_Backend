const express = require("express");
const cors = require("cors");
const emailConfig = require("./app/config/email.config");
const mg = require('mailgun-js');
const multer = require("multer");
const app = express();


const mailgun = () =>
    mg({
        apiKey: emailConfig().apiKey,
        domain: emailConfig().domain,
    });

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

var corsOptions = {
  origin: "http://localhost:8081"
};

app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

app.post('/api/email', (req, res) => {
    const { from, sender, email, subject, message } = req.body;
    mailgun()
        .messages()
        .send(
            {
                from: `${sender} ${from}`,
                to: `${email}`,
                subject: `${subject}`,
                html: `<p>${message}</p>`,

            },
            (error, body) => {
                if (error) {
                    console.log(error);
                    res.status(500).send({ message: 'Error in sending email' });
                } else {
                    console.log(body);
                    res.send({ message: 'Email sent successfully' });
                }
            }
        );
});
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
const db = require("./app/models");
db.sequelize.sync();

