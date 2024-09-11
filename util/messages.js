
const moment = require('moment-timezone');


function formatmessage(username,text)
{
    return{
        username,
        text,
        time: moment().tz('Asia/Kolkata').format("h:mm a")
};
}
module.exports=formatmessage;