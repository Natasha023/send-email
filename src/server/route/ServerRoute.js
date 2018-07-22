const express = require('express');
const ServerPortRouter = express.Router();
const sendEmailWithMailgun = require("../services/mailgun");
const sendEmailWithSendGrid = require("../services/sendgrid");


ServerPortRouter.route('/sendEmail').post(function (req, res) {
  //send by sendgrid first
  return sendEmailWithSendGrid(req.body).then(()=>{
     res.status(200).send('Send Mail Successfully!');
   }).catch(err => {
    console.log(`Send Mail with SendGrid failed with error: ${err}`);
    // try again with mailGun
    return sendEmailWithMailgun(req.body).then(()=>{
        res.status(200).send('Send Mail Successfully!');
    })
    .catch(err => {
        res.status(400).send(`Send Mail Failed with Error: ${err}`);
    })
})
});


module.exports = ServerPortRouter;