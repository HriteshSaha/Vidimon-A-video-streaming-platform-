import {asyncHandler} from '../utils/async-handler.js'
import { User } from '../models/user.model.js'
import { ApiError } from '../utils/apiErrors.js'
import { uploarOnCloudinary } from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { response } from 'express'

const registerUser = asyncHandler(async (req, res) => {
    
    // STEPS of making register controller:-

    // Get user details from frontend form
    // Validation - Should not be empty
    // Check if user already exists: [Check by email & username]
    // Check for images, check for avatar
    // Upload the images to cloudinary
    // Create user object: Create entry in db
    // Remove passward and refresh token field from responce 
    // Check for user creation
    // return response

    
    const {userName, fullName, email, password} = req.body
    user
    console.log(`fullname: ${fullName}, email: ${email}`);

    if (
        [fullName, email, userName, password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }

    const existUser = User.findOne({
        $or: [{userName}, {email}]
    })

    if (existUser){
        throw new ApiError(409, "user with this username or email already exists")
    }

    const avatarLocalPath = req.files?.avatar[0].path;
    const coverImageLocalPath = req.files?.coverImage[0].path

    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar file is required")
    }

    const avatar = await uploarOnCloudinary(avatarLocalPath)
    const coverImage = await uploarOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "avatar file is required")
    }

    const user = await User.create({
        fullName,
        email,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        password,
        userName: userName.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password, -refreshToken"
    )

    if (!createdUser){
        throw new ApiError(500, "Something went wrong while regestring the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser)
    )
})

export {registerUser}