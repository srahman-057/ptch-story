import { neon } from '@neondatabase/serverless';
import { Redis } from '@upstash/redis'
import dotenv from "dotenv";

// Connection
dotenv.config();
const REDIS_URL = process.env.REDIS_REST_URL;
const REDIS_TOKEN = process.env.REDIS_REST_TOKEN;

export async function redisConnect(){
    try{
        const tempRedis = new Redis({
        url: REDIS_URL,
        token: REDIS_TOKEN,
        })
        console.log("Redis Connected Successfully.");
        return tempRedis;
    }
    catch(error){
        console.log("Redis Connection Failed: ", error);
    }
}

export async function sqlConnect(){
    try{
        const tempSql = neon(process.env.DATABASE_URL);
        console.log("SQL Connected Successfully.");
        return tempSql;
    }
    catch(error){``
        console.log("SQL Connection Failed: ", error);
    }
}