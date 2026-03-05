
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendVerificationEmail } from "../services/email.service.js";
import crypto from "crypto";

const generateVerificationToken = ()=>{
      
    const verificationPayload = crypto.randomBytes(32).toString("hex");

    return verificationPayload
}

const registerUser = asyncHandler( async (req, res)=> {
    const {email, password} = req.body;
    console.log(email, password)
    if(!email || !password){
        throw new ApiError(400, "all fields are required");
    }
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({email: email});

    if(existingUser){
        throw new ApiError(409, "Email already in use");
    }
    const token = generateVerificationToken();
    const user = await User.create({
        email: normalizedEmail,
        password: password,
        verification: {
            token: token,
            expiry: Date.now() + 15 * 60 * 1000
        }
    })

    try {
       const mail = await sendVerificationEmail(normalizedEmail, token);
       console.log(mail);
    } catch (error) {
       await User.findByIdAndDelete(user._id); 
       throw new ApiError(500, "An Error occured while sending verification email", error);
    }

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken -verification"
    )

    if(!createdUser){
        throw new ApiError(500, "Server Error");
    }

    return res
    .status(201)
    .json(
        new ApiResponse(201, createdUser, "User registered successfully")
    )

})

const verifyUser = asyncHandler( async(req, res)=>{
    const {token} = req.query;
    if(!token){
        throw new ApiError(500, "All fields are required");
    }
    console.log(token)
    const user = await User.findOne({
        "verification.token": token,
        "verification.expiry": { $gt: Date.now() }
    })

    if(!user){
        throw new ApiError(400, "Token Expired")
    }

    user.isVerified = true;
    user.verification = undefined;
    await user.save({validateBeforeSave: false});


    return res
    .status(200)
    .json(
        new ApiResponse(200, {}, "verified")
    )
})

export {registerUser, verifyUser}
