import twilio from 'twilio';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = new twilio(accountSid, authToken);
function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000);
}

const otpStore = {};
 export  const get_otp=(req, res) => {
    const { phoneNumber } = req.body;
    const otp = generateOtp();
    otpStore[phoneNumber] = otp;

    client.messages.create({
        body: `Your OTP code is ${otp}`,
        from: twilioPhoneNumber,
        to: phoneNumber
    }).then(message => {
        res.status(200).send({ message: 'OTP sent successfully' });
    }).catch(error => {
        console.log(error)
        res.status(500).send({ error: 'Failed to send OTP' });
    });
}


export const verify_otp= (req, res) => {
    const { phoneNumber, otp } = req.body;
    if (otpStore[phoneNumber] == otp) {
        delete otpStore[phoneNumber];
        res.status(200).send({ message: 'OTP verified successfully' });
    } else {
        res.status(400).send({ error: 'Invalid OTP' });
    }
}

