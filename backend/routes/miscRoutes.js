import express from "express";
import {getResume} from "../controllers/miscController.js"

const miscrouter = express.Router();
miscrouter.get("/resume", getResume);
//miscrouter.get("/portfolio", getPortfolio);

export default miscrouter;