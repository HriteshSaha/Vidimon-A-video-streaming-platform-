import mongoose, { Schema, Types } from 'mongoose'

const videoSchema = new Schema({
    videoFile: {
        type: String, // cloudnary url
        required: true,
    },

    thumbnail: {
        type: String, // Cloudnary url
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    duration: {
        type: Number, // video duration will get from cloudnary
        required: true
    },

    views: {
        type: Number,
        default: 0
    },

    isPublished: {
        type: Boolean,
        default: true
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{timesatamp: true})

export const Video = mongoose.model("Video", videoSchema)