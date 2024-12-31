


// const bcryptjs = require('bcryptjs');
// const { sendVerificationEamil, senWelcomeEmail } = require('../middlewares/email');
// const { generateTokenAndSetCookies } = require('../middlewares/generateToken');
// const Usermodel = require('../models/user');

// const Reigster = async (req, res) => {
//     try {
//         const { email, password, name } = req.body;
//         if (!email || !password || !name) {
//             return res.status(400).json({ success: false, message: "All fields are required" });
//         }

//         const ExistsUser = await Usermodel.findOne({ email });
//         if (ExistsUser) {
//             return res.status(400).json({ success: false, message: "User Already Exists Please Login" });
//         }

//         const hashedPassword = await bcryptjs.hashSync(password, 10);
//         const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
//         const user = new Usermodel({
//             email,
//             password: hashedPassword,
//             name,
//             verificationToken,
//             verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
//         });
//         await user.save();

//         generateTokenAndSetCookies(res, user._id);
//         await sendVerificationEamil(user.email, verificationToken);
//         return res.status(200).json({ success: true, message: "User Registered Successfully", user });
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({ success: false, message: "Internal server error" });
//     }
// }

// const VerfiyEmail = async (req, res) => {
//     try {
//         const { code } = req.body;
//         const user = await Usermodel.findOne({
//             verificationToken: code,
//             verificationTokenExpiresAt: { $gt: Date.now() }
//         });
//         if (!user) {
//             return res.status(400).json({ success: false, message: "Invalid or Expired Code" });
//         }

//         user.isVerified = true;
//         user.verificationToken = undefined;
//         user.verificationTokenExpiresAt = undefined;
//         await user.save();

//         await senWelcomeEmail(user.email, user.name);
//         return res.status(200).json({ success: true, message: "Email Verified Successfully" });

//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({ success: false, message: "Internal server error" });
//     }
// }

// module.exports = { Reigster, VerfiyEmail };



const bcryptjs = require('bcryptjs');
const { sendVerificationEamil, senWelcomeEmail } = require('../middlewares/email');
const { generateTokenAndSetCookies } = require('../middlewares/generateToken');
const Usermodel = require('../models/user');

const Reigster = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const ExistsUser = await Usermodel.findOne({ email });
        if (ExistsUser) {
            return res.status(400).json({ success: false, message: "User Already Exists. Please Login" });
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new Usermodel({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        });
        await user.save();

        generateTokenAndSetCookies(res, user._id);
        await sendVerificationEamil(user.email, verificationToken);

        return res.status(200).json({ success: true, message: "User Registered Successfully", user });
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: "Duplicate Key Error. Email must be unique." });
        }
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
const VerfiyEmail = async (req, res) => {
    try {
        const { code } = req.body;
        const user = await Usermodel.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or Expired Code" });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await senWelcomeEmail(user.email, user.name);
        return res.status(200).json({ success: true, message: "Email Verified Successfully" });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: "Internal server error" });
    }
}

module.exports = { Reigster,VerfiyEmail };

