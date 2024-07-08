import twilio from 'twilio'
const accountSid = 'AC8dd48cdd254b3adf8d95da8b11a469d7';
const authToken = 'e198c3317ad54d29e7d8dfc37a360388';
const twilioPhoneNumber = '+14056453885';

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
