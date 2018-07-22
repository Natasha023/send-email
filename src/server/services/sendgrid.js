const sgMail = require('@sendgrid/mail');
const config = require('../config')
sgMail.setApiKey(config.sendgrid.SENDGRID_API_KEY);

/** Sending a Single Email to a Single Recipient With Multiple CCs/BCCs
 * {
  "personalizations": [{
      "to": [{
          "email": "recipient1@example.com"
      }],
      "cc": [{
          "email": "recipient2@example.com"
      }, {
          "email": "recipient3@example.com"
      }, {
          "email": "recipient4@example.com"
      }],
      "substitutions": {
          "%fname%": "recipient",
          "%CustomerID%": "CUSTOMER ID GOES HERE"
      },
      "subject": "YOUR SUBJECT LINE GOES HERE"
  }]
} */

const stringToEmailList = (emailString) => { 
  let result = [];
  emailString.split(';').forEach(element => {
      result.push({email: element});
  });
  return result;
}
 
const personalizations = (data)=> { 
  let result = {};
  let personal = [];
  let firstObj = {}
  if(data.cc){
    firstObj['cc'] = stringToEmailList(data.cc);
  }  
  if(data.bcc){
    firstObj['bcc'] = stringToEmailList(data.bcc);
  }
  firstObj['to'] = stringToEmailList(data.to);
  firstObj['subject'] = data.subject;
  personal.push(firstObj);
return { 
      "from": data.from,
      "personalizations": personal,
       "text": data.text
  }   
}

sendEmailWithSendGrid = function (data) {
   if(data.to.includes(';')|data.cc||data.bcc)  data = personalizations(data);
   console.log(`SendGrid transformed data: ${JSON.stringify(data)}`);
   return sgMail.send(data);
}

module.exports = sendEmailWithSendGrid;
