const UserModel = require("../models/user");
const nodemailer = require('nodemailer');
//signup routes
module.exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const newUser = new UserModel({ email, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        if (err.code === 11000 && err.keyPattern && err.keyPattern.email === 1) {
            // Duplicate email error
            return res.status(400).json({ message: "Email address already in use" });
        }
        console.error(err);
        res.status(500).json({ message: "Internal server error" }); // Send error response
    }
    console.log(req.body);
};

//signin routes
module.exports.signin = (req, res) => {
    console.log(req.body.email);

    //email and password match

    UserModel.findOne({ email: req.body.email })
        .then((result) => {
            console.log(result, "11");

            if (result.password !== req.body.password) {
                res.send({ code: 404, message: "password wrong" });
            } else {
                res.send({
                    email: result.email,
                    code: 200,
                    message: "user found",
                    token: "hjhjg",
                });
            }
        })
        .catch((err) => {
            res.send({ code: 500, message: "user not found" });
        });

    // try {
    //   const { email, password } = req.body;
    //   const newUser = new UserModel({ email, password });
    //   await newUser.save();
    //   res.status(201).json(newUser);
    // } catch (err) {
    //   if (err.code === 11000 && err.keyPattern && err.keyPattern.email === 1) {
    //     // Duplicate email error
    //     return res.status(400).json({ message: "Email address already in use" });
    //   }
    //   console.error(err);
    //   res.status(500).json({ message: "Internal server error" }); // Send error response
    // }
    // console.log(req.body);
};

//otp routes
module.exports.sendotp = async(req, res) => {
    console.log(req.body);

    const _otp = Math.floor( 100000 + Math.random() *900000)
    console.log(_otp);

    let user = await UserModel.findOne({email:req.body.email})

            //send to user mail
if(!user){
    res.send({code:500, message:'User not found'})
}

let testAccount = await nodemailer.createTestAccount()


            let transporter = nodemailer.createTransport({
                sendMail: true,
                host:"smtp.ethereal.email",
                port:587,
                secure:false,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass
                }
            })


            let info = await transporter.sendMail({
                from: 'sweetyashtikar23@gmailcom',
                to: req.body.email,
                subject: 'OTP',
                text: String(_otp),
                html:`<html>
                <body>
                Hello and Welcome
                </>
                </html>`
            })

            if (info.messageId) {
                console.log(info,84)
                UserModel.updateOne({ email: req.body.email }, { otp: _otp })
                    .then(result => {
                        res.send({ code: 200, message: "otp send" });

                    })
                    .catch(err => {
                        res.send({ code: 500, message: "Server Error" });

                    })
            }
            else {
                res.send({ code: 500, message: "Server Error" });
            }
}
//submit otp
module.exports.submitotp = (req, res) => {
    console.log(req.body);


    UserModel.findOne({ otp: req.body.otp })
        .then((result) => {
            //update the password

            UserModel.updateOne({ email: result.email }, { password:req.body.password })
            .then(result => {
                res.send({ code: 200, message: "Password  Updated" });

            })
            .catch(err => {
                res.send({ code: 500, message: "Server Error" });

            })

        })
        .catch((err) => {
            res.send({ code: 500, message: "otp is wrong" });
        });
};

