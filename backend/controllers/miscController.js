import dotenv from "dotenv";
import { redisConnect } from "../lib/utilityFunctions.js";

dotenv.config();


// Serving resume data
export const getResume = async (req, res) => {
    const resumeURL = process.env.RESUME_ORIGIN;
    var data = new FormData();
    data.append('key', 'value');

    fetch(resumeURL)
    .then(response => response.json())
    .then(data => {
        res.status(200).json(data.url);
    });
}