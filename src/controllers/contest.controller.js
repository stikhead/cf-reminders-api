import { contestSyncToDatabase } from "../services/contest.service.js";
import asyncHandler from "../utils/asyncHandler.js";

const contest = asyncHandler(async(req, res)=>{
    contestSyncToDatabase();
})

export {contest}