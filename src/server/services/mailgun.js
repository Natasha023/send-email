var mailgun = require('mailgun-js');
const config = require("../config")
var mailgun = require('mailgun-js')({apiKey: config.mailgun.MAILGUN_API_KEY, domain: config.mailgun.DOMAIN});

/** Sending a Single Email to a Single Recipient With Multiple CCs/BCCs
 * var data = {
  from: 'Excited User <me@samples.mailgun.org>',
  to: 'foo@example.com, baz@example.com, bar@example.com',
  cc: 'baz@example.com',
  bcc: 'bar@example.com',
  subject: 'Complex',
  text: 'Testing some Mailgun awesomness!',
  html: "<html>HTML version of the body</html>",
  attachment: filepath
}; */
  
const transformData = (data)=> { 
  let result = {}; 
  if(data.cc){
    result['cc'] = data.cc.replace(';',',');
  }
  if(data.bcc){
    result['bcc'] = data.bcc.replace(';',',');
  }
  result['from'] = data.from;
  result['to'] = data.to.replace(';',',');
  result['text'] = data.text;
  result['subject'] = data.subject;
return result;
}

sendEmailWithMailgun = function (data) {
  data = transformData(data);
  console.log(`MailGun transformed data: ${JSON.stringify(data)}`);
  return mailgun.messages().send(data);
}

module.exports = sendEmailWithMailgun;
