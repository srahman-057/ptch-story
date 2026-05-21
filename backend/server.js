import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import storyRoutes from "./routes/storyRoutes.js";
import { aj } from "./lib/arcjet.js"


// Init
dotenv.config();
const PORT = process.env.PORT || 3000;
const ORIGIN_URL = process.env.ORIGIN_URL;
const REDIS_URL = process.env.REDIS_REST_URL;
const PORTFOLIO_ORIGIN = process.env.PORTFOLIO_ORIGIN;

const app = express();
app.use(express.json());

// Security
app.use(helmet());
app.use(morgan("dev"));

// Define the allowed origin
const allowedOrigin = ORIGIN_URL; 

// Configure CORS options
const corsOptions = {
  origin: [allowedOrigin, REDIS_URL, PORTFOLIO_ORIGIN],
  methods: ['GET'] // Specify allowed HTTP methods
};

app.use(cors(corsOptions));

app.use(async (req, res, next) =>{
    try{
        const decision = await aj.protect(req, {
            requested: 1,
        });

        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                res.status(429).json({ error: "Request Limit Exceeded." });
            }
            else if(decision.reason.isBot()){
                res.status(403).json({ error: "Bot Access Not Allowed" });
            }
            else{
                res.status(403).json({ error: "Forbidden" });
            }
            return
        }

        next();
    }
    catch(err){
        console.log("Problem Detected By Arcjet. ", error);
        next(error);
    }
});

// Body
app.listen(PORT, () => {
    console.log("The server is now running on port " + PORT);
});

app.get("/", (req,res) => {
    res.send("<h1>CRUD EXPRESS</h1>");
});

app.use("/api/stories",storyRoutes);
