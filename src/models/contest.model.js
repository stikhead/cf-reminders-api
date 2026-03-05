import mongoose from "mongoose";

const contestSchema = new mongoose.Schema({
    event: {
        type: String,
        required: true
    },
    resource: {
      type: String,
      enum: ['leetcode', 'codeforces', 'codechef', 'atcoder'],
      required: true  
    },
    resource_id: {
        type: Number,
        enum: [],
        required: true
    },
    eventLink: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    durationSeconds: {
        type: Number
    },
    difficulty: {

    }
    

}, {});

export const Contest = mongoose.model('Contest', contestSchema);